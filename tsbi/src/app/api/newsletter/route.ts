import { NextRequest, NextResponse } from 'next/server';
import { sql, initTables } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
    await initTables();
    // Upsert — re-subscribing the same address updates the timestamp but adds no duplicate
    await sql`
      INSERT INTO newsletter_subscribers (email, subscribed_at, updated_at)
      VALUES (${email}, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
