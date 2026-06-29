import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // nodemailer needs the Node runtime (net/tls)

// Recipient — testing on tech@tsbi.in; set CAREERS_TO=careers@tsbi.in when ready.
const TO = process.env.CAREERS_TO || 'tech@tsbi.in';

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
    const form = await req.formData();
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const role = String(form.get('role') ?? '').trim();
    const cv = form.get('cv');

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 });
    }

    const conf = transportConfig();
    if (!conf) {
      console.error('[careers/apply] no SMTP creds (OUTLOOK_SMTP_USER/OUTLOOK_APP_PASS or GMAIL_SMTP_USER/GMAIL_APP_PASS)');
      return NextResponse.json({ ok: false, error: 'Email is not configured on the server.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: conf.host,
      port: conf.port,
      secure: conf.port === 465,   // 465 implicit TLS; 587 uses STARTTLS
      requireTLS: conf.port === 587,
      auth: { user: conf.user, pass: conf.pass },
    });

    // Attach the uploaded CV if present
    const attachments: { filename: string; content: Buffer }[] = [];
    if (cv && typeof cv === 'object' && 'arrayBuffer' in cv) {
      const file = cv as File;
      if (file.size > 0) {
        attachments.push({ filename: file.name || 'cv', content: Buffer.from(await file.arrayBuffer()) });
      }
    }

    const from = process.env.MAIL_FROM || conf.user;

    await transporter.sendMail({
      from: `"TSBI Careers" <${from}>`,
      to: TO,
      replyTo: email,
      subject: `New application — ${role || 'General'} — ${name || email}`,
      text: `New career application\n\nRole:  ${role || '—'}\nName:  ${name || '—'}\nEmail: ${email}\nCV:    ${attachments.length ? 'attached' : 'not provided'}\n`,
      html: `
        <h2 style="font-family:sans-serif;margin:0 0 14px">New career application</h2>
        <table style="font-family:sans-serif;font-size:14px;line-height:1.6;border-collapse:collapse">
          <tr><td style="padding:4px 16px 4px 0;color:#888">Role</td><td><strong>${esc(role) || '—'}</strong></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Name</td><td><strong>${esc(name) || '—'}</strong></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#888">CV</td><td>${attachments.length ? 'Attached' : 'Not provided'}</td></tr>
        </table>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[careers/apply] send failed', e);
    return NextResponse.json({ ok: false, error: 'Failed to send application.' }, { status: 500 });
  }
}
