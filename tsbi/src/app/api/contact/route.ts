import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // nodemailer needs the Node runtime (net/tls)

// Recipient for contact enquiries. Override with CONTACT_TO in env.
const TO = process.env.CONTACT_TO || 'communication@tsbi.in';

/** Pick an SMTP config from the env creds. MAIL_PROVIDER=outlook|gmail (default outlook). */
function transportConfig(): { host: string; port: number; user: string; pass: string } | null {
  const clean = (s?: string) => (s || '').replace(/\s+/g, ''); // strip app-password spaces
  const configs: Record<string, { host: string; port: number; user?: string; pass: string }> = {
    outlook: {
      host: process.env.OUTLOOK_SMTP_HOST || 'smtp.office365.com',
      port: 587,
      user: process.env.OUTLOOK_SMTP_USER,
      pass: clean(process.env.OUTLOOK_APP_PASS),
    },
    gmail: {
      host: 'smtp.gmail.com',
      port: 587,
      user: process.env.GMAIL_SMTP_USER,
      pass: clean(process.env.GMAIL_APP_PASS),
    },
  };
  const provider = (process.env.MAIL_PROVIDER || 'outlook').toLowerCase();
  const order = provider === 'gmail' ? ['gmail', 'outlook'] : ['outlook', 'gmail'];
  for (const key of order) {
    const c = configs[key];
    if (c.user && c.pass) return { host: c.host, port: c.port, user: c.user, pass: c.pass };
  }
  return null;
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const company = String(body.company ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const projectType = String(body.projectType ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: 'Email and message are required.' }, { status: 400 });
    }

    const conf = transportConfig();
    if (!conf) {
      console.error('[contact] no SMTP creds (OUTLOOK_SMTP_USER/OUTLOOK_APP_PASS or GMAIL_SMTP_USER/GMAIL_APP_PASS)');
      return NextResponse.json({ ok: false, error: 'Email is not configured on the server.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: conf.host,
      port: conf.port,
      secure: conf.port === 465,   // 465 implicit TLS; 587 uses STARTTLS
      requireTLS: conf.port === 587,
      auth: { user: conf.user, pass: conf.pass },
    });

    const from = process.env.MAIL_FROM || conf.user;

    await transporter.sendMail({
      from: `"TSBI Website" <${from}>`,
      to: TO,
      replyTo: email,
      subject: `New enquiry — ${projectType || 'General'} — ${name || email}`,
      text:
        `New contact enquiry\n\n` +
        `Name:     ${name || '—'}\n` +
        `Email:    ${email}\n` +
        `Company:  ${company || '—'}\n` +
        `Budget:   ${budget || '—'}\n` +
        `Services: ${projectType || '—'}\n\n` +
        `Message:\n${message}\n`,
      html: `
        <h2 style="font-family:sans-serif;margin:0 0 14px">New contact enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;line-height:1.6;border-collapse:collapse">
          <tr><td style="padding:4px 16px 4px 0;color:#888">Name</td><td><strong>${esc(name) || '—'}</strong></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Company</td><td>${esc(company) || '—'}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Budget</td><td>${esc(budget) || '—'}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Services</td><td>${esc(projectType) || '—'}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;line-height:1.7;color:#222;margin:16px 0 0;white-space:pre-line">${esc(message)}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] send failed', e);
    return NextResponse.json({ ok: false, error: 'Failed to send enquiry.' }, { status: 500 });
  }
}
