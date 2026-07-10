import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sql, initTables } from '@/lib/db';

export const runtime = 'nodejs'; // nodemailer needs the Node runtime (net/tls)

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

/**
 * Broadcast a newsletter to every stored subscriber.
 * Protected by NEWSLETTER_ADMIN_KEY — pass it as `Authorization: Bearer <key>`
 * or as `{ "key": "<key>" }` in the body. Recipients are hidden via BCC, sent in
 * batches so we stay under provider limits and never leak the subscriber list.
 *
 * Body: { subject: string, html?: string, text?: string, key?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const adminKey = process.env.NEWSLETTER_ADMIN_KEY;
    if (!adminKey) {
      console.error('[newsletter/send] NEWSLETTER_ADMIN_KEY is not set');
      return NextResponse.json({ ok: false, error: 'Newsletter sending is not configured on the server.' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const authHeader = req.headers.get('authorization') || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const provided = bearer || String((body as { key?: string }).key ?? '');
    if (provided !== adminKey) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const subject = String((body as { subject?: string }).subject ?? '').trim();
    const html = typeof (body as { html?: string }).html === 'string' ? (body as { html?: string }).html! : '';
    const text = typeof (body as { text?: string }).text === 'string' ? (body as { text?: string }).text! : '';
    if (!subject || (!html && !text)) {
      return NextResponse.json({ ok: false, error: 'subject and html or text are required.' }, { status: 400 });
    }

    const conf = transportConfig();
    if (!conf) {
      console.error('[newsletter/send] no SMTP creds');
      return NextResponse.json({ ok: false, error: 'Email is not configured on the server.' }, { status: 500 });
    }

    await initTables();
    const rows = (await sql`SELECT email FROM newsletter_subscribers ORDER BY subscribed_at`) as { email: string }[];
    const emails = rows.map((r) => r.email).filter(Boolean);
    if (emails.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, message: 'No subscribers yet.' });
    }

    const transporter = nodemailer.createTransport({
      host: conf.host,
      port: conf.port,
      secure: conf.port === 465, // 465 implicit TLS; 587 uses STARTTLS
      requireTLS: conf.port === 587,
      auth: { user: conf.user, pass: conf.pass },
    });
    const from = process.env.MAIL_FROM || conf.user;

    const BATCH = 40;
    let sent = 0;
    for (let i = 0; i < emails.length; i += BATCH) {
      const bcc = emails.slice(i, i + BATCH);
      await transporter.sendMail({
        from: `"The Small Big Idea" <${from}>`,
        to: from,          // visible To is the sender; real recipients stay hidden in BCC
        bcc,
        subject,
        text: text || undefined,
        html: html || undefined,
      });
      sent += bcc.length;
    }

    return NextResponse.json({ ok: true, sent });
  } catch (e) {
    console.error('[newsletter/send] failed', e);
    return NextResponse.json({ ok: false, error: 'Failed to send newsletter.' }, { status: 500 });
  }
}
