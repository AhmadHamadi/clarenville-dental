import nodemailer from 'nodemailer';
import { evaluateSubmission } from '../lib/spam-filter.js';

const serviceMap = {
  emergency:     'Emergency Dentistry',
  invisalign:    'Invisalign Consultation',
  implants:      'Dental Implants',
  family:        'Family Dentistry / Checkup',
  cleanings:     'Dental Cleaning',
  'wisdom-teeth':'Wisdom Teeth Assessment',
  other:         'Other / Not Sure',
};

/** Hosts we always trust in addition to the host the request actually arrived on. */
function trustedHosts() {
  return [
    'clarenvilledental.com',
    'www.clarenvilledental.com',
    process.env.VERCEL_URL,                       // current deployment URL
    process.env.VERCEL_PROJECT_PRODUCTION_URL,    // stable production URL
    process.env.VERCEL_BRANCH_URL,                // branch/preview URL
  ].filter(Boolean);
}

/** Default mail sender: lazily builds the SMTP transport from env vars. */
async function sendViaSmtp(mail) {
  const port = Number(process.env.SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter.sendMail(mail);
}

/**
 * Build the contact handler. `sendMail` is injectable so tests can run the real
 * handler logic without an SMTP server.
 */
export function createContactHandler({ sendMail = sendViaSmtp } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body || {};
    const headers = req.headers || {};

    // ── Spam screening (server side) ───────────────────────────
    // Bots are dropped SILENTLY: we still return a success response so they get
    // no signal about what tripped the filter.
    const verdict = evaluateSubmission({
      body,
      origin: headers.origin,
      referer: headers.referer || headers.referrer,
      host: headers.host,
      allowedHosts: trustedHosts(),
    });
    if (verdict.drop) {
      console.warn(`Contact form: dropped spam (${verdict.reason})`);
      return res.status(200).json({ success: true });
    }

    // ── Genuine validation ─────────────────────────────────────
    const { first_name, last_name, phone, email, service, message } = body;
    if (!first_name || !last_name || !phone) {
      return res.status(400).json({
        error: 'Missing required fields: first name, last name, and phone are required.',
      });
    }

    const serviceLabel = serviceMap[service] || service || 'Not specified';
    const patientEmail = (email || '').trim();
    const patientMessage = (message || '').trim() || 'No message provided.';

    try {
      await sendMail({
        from: `"Clarenville Dental Website" <${process.env.SMTP_USER}>`,
        to: process.env.TO_EMAIL || 'clarenville.dental@gmail.com',
        replyTo: patientEmail || undefined,
        subject: `New Appointment Request — ${first_name} ${last_name}`,
        text: [
          'New appointment request from clarenvilledental.com',
          '',
          `Name:    ${first_name} ${last_name}`,
          `Phone:   ${phone}`,
          `Email:   ${patientEmail || 'Not provided'}`,
          `Service: ${serviceLabel}`,
          `Message: ${patientMessage}`,
        ].join('\n'),
        html: `
          <h2 style="margin:0 0 16px;font-family:sans-serif;">New Appointment Request</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
            <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Name</td><td style="padding:6px 0;font-weight:600;">${first_name} ${last_name}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;font-weight:600;">${phone}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;">${patientEmail || 'Not provided'}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b7280;">Service</td><td style="padding:6px 0;">${serviceLabel}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:6px 0;">${patientMessage.replace(/\n/g, '<br>')}</td></tr>
          </table>
        `,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Contact form error:', err);
      return res.status(500).json({
        error: 'Failed to send your message. Please call us directly at (709) 466-7001 or try again.',
      });
    }
  };
}

export default createContactHandler();
