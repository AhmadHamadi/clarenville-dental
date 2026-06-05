/**
 * lib/spam-filter.js
 * Server-side spam screening for the contact / appointment form.
 *
 * This module is PURE and dependency-free so it can be unit-tested without a
 * network or mail server. `api/contact.js` calls evaluateSubmission() before
 * sending any email.
 *
 * Philosophy: lean on a few RELIABLE, unambiguous bot signals rather than
 * guessing from message wording. Real patients say all sorts of things
 * ("I work from home", "do you have a special offer?"), so we deliberately do
 * NOT filter on keywords — that only risks blocking genuine people. Automated
 * spam gives itself away structurally instead:
 *   - it POSTs straight to the endpoint (no/wrong Origin),
 *   - it fills hidden honeypot fields a human never sees,
 *   - it submits instantly, and
 *   - it stuffs links into the message or name.
 *
 * Bots are dropped silently by the caller (success is still shown) so they get
 * no feedback. Anything ambiguous is allowed through to protect patients.
 *
 * Clarenville Dental Care
 */

export const MIN_FILL_MS = 2500;          // submissions faster than this look automated
export const MAX_NAME_LEN = 80;           // real first/last names don't exceed this
export const MAX_MESSAGE_LEN = 5000;      // very generous for an appointment note

// Hidden form fields a human never sees or fills. If any has a value -> bot.
export const HONEYPOT_FIELDS = ['website', 'company'];

// URL-ish detection.
const URL_PROTO_RE = /(?:https?:\/\/|www\.)[^\s]+/gi;
const URL_TLD_RE = /\b[a-z0-9][a-z0-9-]*\.(?:com|net|org|info|biz|io|co|ru|cn|xyz|top|click|shop|store|online|site|link|live|icu|vip|uk|de|us|ca)\b/gi;
const HTML_TAG_RE = /<[^>]+>/;

function normalizeHost(value) {
  return String(value || '').toLowerCase().trim().replace(/:\d+$/, '');
}

/** Extract a bare host from an Origin or Referer header value. */
function hostFromHeader(value) {
  if (!value) return '';
  const raw = String(value).trim();
  try {
    return normalizeHost(new URL(raw).host);
  } catch {
    // Not a full URL (e.g. already a bare host); strip scheme/path defensively.
    return normalizeHost(raw.replace(/^[a-z]+:\/\//i, '').split('/')[0]);
  }
}

/** Count distinct URL-like tokens in a string. */
export function countLinks(text) {
  const s = String(text || '');
  const found = new Set();
  for (const m of s.matchAll(URL_PROTO_RE)) found.add(m[0].toLowerCase());
  for (const m of s.matchAll(URL_TLD_RE)) found.add(m[0].toLowerCase());
  return found.size;
}

function hasLink(text) {
  return countLinks(text) > 0;
}

/**
 * Decide whether a submission should be dropped.
 *
 * @param {object}   opts
 * @param {object}   opts.body            Parsed request body (form fields).
 * @param {string}  [opts.origin]         Origin request header.
 * @param {string}  [opts.referer]        Referer request header.
 * @param {string}  [opts.host]           Host request header (the host the browser hit).
 * @param {string[]} [opts.allowedHosts]  Extra hosts to trust (production domain, VERCEL_URL...).
 * @param {number}  [opts.now]            Current time in ms (defaults to Date.now()).
 * @returns {{drop: boolean, reason: string}}
 */
export function evaluateSubmission(opts = {}) {
  const {
    body = {},
    origin = '',
    referer = '',
    host = '',
    allowedHosts = [],
    now = Date.now(),
  } = opts;

  // ── Layer 1: Origin / Referer ────────────────────────────────
  // A genuine same-origin POST made by the browser's fetch() always carries an
  // Origin header whose host equals the Host the browser connected to. Bots that
  // POST directly to the endpoint (curl, scripts) usually omit it entirely.
  // This single check stops the bulk of the spam, which never loads the page.
  const trusted = new Set(
    [normalizeHost(host), ...allowedHosts.map(normalizeHost)].filter(Boolean)
  );
  const candidate = hostFromHeader(origin) || hostFromHeader(referer);
  if (!candidate) {
    return { drop: true, reason: 'origin:missing' };
  }
  if (!trusted.has(candidate)) {
    return { drop: true, reason: `origin:mismatch:${candidate}` };
  }

  // ── Layer 2: Honeypot ────────────────────────────────────────
  for (const field of HONEYPOT_FIELDS) {
    if (String(body[field] || '').trim() !== '') {
      return { drop: true, reason: `honeypot:${field}` };
    }
  }

  // ── Layer 3: Timing trap ─────────────────────────────────────
  // The page stamps form_loaded_at at load. If present and the form was
  // submitted unrealistically fast (or with a future timestamp), it's a bot.
  // If the token is missing/unparseable, we DO NOT drop — a real visitor with
  // JS disabled or a cached page should still get through (origin already valid).
  const loadedAtRaw = body.form_loaded_at;
  if (loadedAtRaw !== undefined && loadedAtRaw !== null && String(loadedAtRaw).trim() !== '') {
    const loadedAt = Number(loadedAtRaw);
    if (Number.isFinite(loadedAt) && loadedAt > 0) {
      const elapsed = now - loadedAt;
      if (elapsed < MIN_FILL_MS) {
        return { drop: true, reason: `timing:${elapsed}ms` };
      }
    }
  }

  // ── Layer 4: Structural content checks ───────────────────────
  // Only unambiguous signals — no keyword guessing, so real patients are never
  // blocked for what they happen to write.
  const firstName = String(body.first_name || '');
  const lastName = String(body.last_name || '');
  const message = String(body.message || '');
  const nameText = `${firstName} ${lastName}`;

  // Length caps (bots send oversized or stuffed payloads). Very generous.
  if (firstName.length > MAX_NAME_LEN || lastName.length > MAX_NAME_LEN) {
    return { drop: true, reason: 'content:name-too-long' };
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return { drop: true, reason: 'content:message-too-long' };
  }

  // Links or HTML in a name field is never something a real patient does.
  if (HTML_TAG_RE.test(nameText) || hasLink(nameText)) {
    return { drop: true, reason: 'content:name-has-link-or-html' };
  }

  // A patient might paste one link; spam blasts pile on several. Only 2+ drops.
  if (countLinks(message) >= 2) {
    return { drop: true, reason: 'content:multiple-links' };
  }

  return { drop: false, reason: 'ok' };
}

export default evaluateSubmission;
