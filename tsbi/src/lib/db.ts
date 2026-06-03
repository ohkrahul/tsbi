import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env.local');
}

export const sql = neon(process.env.DATABASE_URL);

/* Auto-creates submission tables on first request within each worker.
   CREATE TABLE IF NOT EXISTS is a no-op when the table already exists. */
let ready = false;
export async function initTables() {
  if (ready) return;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_enquiries (
      id         SERIAL PRIMARY KEY,
      name       TEXT,
      email      TEXT NOT NULL,
      company    TEXT,
      budget     TEXT,
      project_type TEXT,
      message    TEXT,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS career_applications (
      id           SERIAL PRIMARY KEY,
      name         TEXT,
      email        TEXT NOT NULL,
      role         TEXT,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id            SERIAL PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  ready = true;
}
