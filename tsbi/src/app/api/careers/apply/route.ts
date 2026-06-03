import { NextRequest, NextResponse } from 'next/server';
import { sql, initTables } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await initTables();
    await sql`
      INSERT INTO career_applications (name, email, role)
      VALUES (
        ${body.name ?? null},
        ${body.email ?? ''},
        ${body.role ?? null}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
