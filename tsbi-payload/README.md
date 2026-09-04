# TSBI CMS (Payload 3)

Standalone headless CMS for the TSBI website. Same repo as the frontend (`../tsbi`),
deployed as its **own** Vercel project. Manages: **Case Studies, Journal (News),
Media Coverage, Careers, Clients**.

- Content DB: the same **Neon** Postgres as the site (Payload creates its own tables).
- Image uploads: **Vercel Blob**.
- The frontend reads this over REST (`GET /api/<collection>`) via `NEXT_PUBLIC_CMS_URL`,
  and always falls back to hardcoded data when this is unreachable — so the site never breaks.

## Local development

```bash
cd tsbi-payload
npm install
# .env is already filled (Neon URL + a dev PAYLOAD_SECRET). For image uploads,
# add a Vercel Blob token; leave it empty to store uploads on local disk.
npm run dev            # http://localhost:3001/admin
```

First run: open `http://localhost:3001/admin` and create the first admin user.
First boot auto-creates Payload's tables in the Neon database.

Then run the site (`cd ../tsbi && npm run dev`) — it reads this CMS at
`NEXT_PUBLIC_CMS_URL=http://localhost:3001` (already set in `../tsbi/.env`).

## Environment variables

| Var | Purpose |
|-----|---------|
| `PAYLOAD_SECRET` | Signs admin sessions. **Rotate for production.** |
| `DATABASE_URI` | Neon Postgres connection string (same DB as the site). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for image uploads (empty → local disk in dev). |
| `FRONTEND_URL` | The site's origin, for CORS/CSRF (e.g. `https://tsbi.vercel.app`). |

## Deploy to Vercel (one-time)

1. Vercel → **Add New → Project** → import the **same** GitHub repo (`ohkrahul/tsbi`).
2. Set **Root Directory = `tsbi-payload`**.
3. Add env vars: `PAYLOAD_SECRET` (new random string), `DATABASE_URI` (Neon),
   `BLOB_READ_WRITE_TOKEN` (create a Blob store under Storage), `FRONTEND_URL`
   (the site's URL). Deploy.
4. On the **site's** Vercel project, set `NEXT_PUBLIC_CMS_URL` to this project's URL
   (e.g. `https://tsbi-cms.vercel.app` or a custom `cms.tsbi.in`) and redeploy.

After that, every `git push` redeploys **both** projects automatically.

## Notes

- `Case Study.image` is a URL text field (matches the site's YouTube-thumbnail / `/tech`
  data). `Journal.coverImage` and `Client.image` are uploads (→ Blob).
- Keep the featured-carousel slugs (`gsk-yeh-science-hai`, `zydus-easiest-exam`,
  `mumbai-indians`, `danone-nurses-day`, `lipton-squid-game`, `sitaare-zameen-par`,
  `ashok-leyland-she-drives-it`) on your case studies, or the featured row on
  `/case-studies` will be empty (the grid + filters still work).
