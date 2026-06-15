import { neon } from '@neondatabase/serverless';

/**
 * Neon client — created lazily.
 *
 * DATABASE_URL is a *runtime* concern (the contact / careers / newsletter API
 * routes write submissions to Postgres). It must NOT be required at build time:
 * `next build` imports these route modules to analyze them, and on Vercel the
 * value is a "Sensitive" env var that isn't available to a CLI `vercel build`.
 * So we defer both the env check and the connection until the first query runs.
 */
type SqlClient = ReturnType<typeof neon>;

let _client: SqlClient | null = null;
function client(): SqlClient {
  if (!_client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    _client = neon(url);
  }
  return _client;
}

// Tagged-template proxy so existing `sql`...`` call sites keep working unchanged.
export const sql = ((strings: TemplateStringsArray, ...values: unknown[]) =>
  client()(strings, ...values)) as unknown as SqlClient;

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
