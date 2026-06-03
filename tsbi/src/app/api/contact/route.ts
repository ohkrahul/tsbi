import { NextRequest, NextResponse } from 'next/server';
import { sql, initTables } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await initTables();
    await sql`
      INSERT INTO contact_enquiries (name, email, company, budget, project_type, message)
      VALUES (
        ${body.name ?? null},
        ${body.email ?? ''},
        ${body.company ?? null},
        ${body.budget ?? null},
        ${body.projectType ?? null},
        ${body.message ?? null}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
