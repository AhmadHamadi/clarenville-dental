/**
 * Runs real bot scenarios AND a genuine human submission through the ACTUAL
 * contact handler (api/contact.js), with a fake mailer injected so no email is
 * sent. Asserts: bots are dropped silently (success shown, no mail) while the
 * genuine submission reaches the mailer.
 *
 *   node --test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../api/contact.js';

const SITE_HOST = 'clarenvilledental.com';

// Minimal Vercel-style req/res doubles.
function makeReq({ method = 'POST', headers = {}, body = {} } = {}) {
  return { method, headers, body };
}
function makeRes() {
  return {
    statusCode: null,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    json(obj) { this.payload = obj; return this; },
  };
}

// Default "real browser" headers: a same-origin POST from the live site.
function browserHeaders(extra = {}) {
  return {
    host: SITE_HOST,
    origin: `https://${SITE_HOST}`,
    referer: `https://${SITE_HOST}/contact`,
    ...extra,
  };
}

// A clean, valid human submission that filled the form like a person would.
function humanBody(extra = {}) {
  return {
    first_name: 'Sarah',
    last_name: 'Walsh',
    phone: '709-555-0142',
    email: 'sarah.walsh@example.com',
    service: 'cleanings',
    message: 'Hi, I would like to book a cleaning for my two kids next week.',
    website: '',                          // honeypot left empty
    company: '',                          // honeypot left empty
    form_loaded_at: String(Date.now() - 8000), // filled the form over 8s
    ...extra,
  };
}

/** Run one submission through the real handler with a recording mailer. */
async function run(req) {
  const sent = [];
  const handler = createContactHandler({
    async sendMail(mail) { sent.push(mail); return { messageId: 'test' }; },
  });
  const res = makeRes();
  await handler(req, res);
  return { res, sent };
}

// ── The genuine human must get through ─────────────────────────
test('genuine human submission is delivered', async () => {
  const { res, sent } = await run(makeReq({ headers: browserHeaders(), body: humanBody() }));
  assert.equal(sent.length, 1, 'mailer should be called for a real patient');
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.payload, { success: true });
  assert.match(sent[0].subject, /Sarah Walsh/);
});

test('human with NO timing token (JS off / cached page) still gets through', async () => {
  const body = humanBody();
  delete body.form_loaded_at;
  const { res, sent } = await run(makeReq({ headers: browserHeaders(), body }));
  assert.equal(sent.length, 1, 'missing timing token must NOT block a valid-origin human');
  assert.equal(res.statusCode, 200);
});

// We deliberately do NOT filter on wording. These messages contain phrases a
// naive keyword filter would flag, but they're things real patients say — they
// must all get through.
const PATIENT_PHRASINGS = [
  'Do you offer a cheap option for a basic checkup?',
  'I work from home, do you have any evening or special offer appointments?',
  'Is there a free quote for Invisalign? A friend said you had the best price in town.',
  'My husband trades forex and is too busy — can I book for him?',
];
for (const message of PATIENT_PHRASINGS) {
  test(`patient phrasing is not blocked: "${message.slice(0, 40)}..."`, async () => {
    const { res, sent } = await run(makeReq({ headers: browserHeaders(), body: humanBody({ message }) }));
    assert.equal(sent.length, 1, 'real patient wording must never be blocked');
    assert.equal(res.statusCode, 200);
  });
}

test('a patient pasting a single link still gets through', async () => {
  const { res, sent } = await run(makeReq({
    headers: browserHeaders(),
    body: humanBody({ message: 'Here is the x-ray from my last dentist: https://drive.example/myxray' }),
  }));
  assert.equal(sent.length, 1, 'one link is fine — only 2+ is treated as spam');
  assert.equal(res.statusCode, 200);
});

// ── Bots must be dropped silently (success shown, no mail) ──────
const BOT_CASES = {
  'direct POST with no Origin/Referer (curl/script)': {
    headers: { host: SITE_HOST },                 // no origin, no referer
    body: humanBody(),
  },
  'POST from a foreign origin': {
    headers: browserHeaders({ origin: 'https://spam-bot.ru', referer: 'https://spam-bot.ru/' }),
    body: humanBody(),
  },
  'honeypot field filled': {
    headers: browserHeaders(),
    body: humanBody({ website: 'http://buy-cheap-meds.example' }),
  },
  'submitted instantly (timing trap)': {
    headers: browserHeaders(),
    body: humanBody({ form_loaded_at: String(Date.now()) }), // 0ms elapsed
  },
  'two or more links in the message (typical SEO/link spam)': {
    headers: browserHeaders(),
    body: humanBody({ message: 'Rank #1 on Google! Visit https://seo-deals.example and https://buy-now.example' }),
  },
  'link/HTML stuffed into the name': {
    headers: browserHeaders(),
    body: humanBody({ first_name: '<a href="http://spam.example">click</a>' }),
  },
};

for (const [name, scenario] of Object.entries(BOT_CASES)) {
  test(`bot dropped: ${name}`, async () => {
    const { res, sent } = await run(makeReq({ headers: scenario.headers, body: scenario.body }));
    assert.equal(sent.length, 0, 'mailer must NOT be called for a bot');
    assert.equal(res.statusCode, 200, 'bot should still see a success status (silent drop)');
    assert.deepEqual(res.payload, { success: true }, 'bot must get no feedback about the filter');
  });
}

// ── Sanity: non-POST still rejected ────────────────────────────
test('non-POST method is rejected', async () => {
  const { res, sent } = await run(makeReq({ method: 'GET', headers: browserHeaders(), body: {} }));
  assert.equal(sent.length, 0);
  assert.equal(res.statusCode, 405);
});

// ── Sanity: genuine validation still applies to real submissions ─
test('valid-origin submission missing required fields gets a 400', async () => {
  const { res, sent } = await run(makeReq({
    headers: browserHeaders(),
    body: humanBody({ first_name: '', last_name: '', phone: '' }),
  }));
  assert.equal(sent.length, 0);
  assert.equal(res.statusCode, 400);
});
