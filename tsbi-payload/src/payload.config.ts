import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CaseStudies } from './collections/CaseStudies'
import { Journal } from './collections/Journal'
import { MediaCoverage } from './collections/MediaCoverage'
import { Careers } from './collections/Careers'
import { Clients } from './collections/Clients'
import { Tags } from './collections/Tags'

const cloudinary = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // No admin UI — /studio replaces it. `user` still tells Payload which
  // collection authenticates.
  admin: { user: Users.slug },
  collections: [Users, Media, CaseStudies, Journal, MediaCoverage, Careers, Clients, Tags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Keep Payload's tables in their own schema so they never clash with the
    // app's tables (contact_enquiries, newsletter_subscribers…) or the leftover
    // Strapi tables still sitting in `public`.
    schemaName: 'payload',
  }),
  sharp,
  // Public site may read the API cross-origin; admin writes stay auth-protected.
  cors: [process.env.FRONTEND_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.FRONTEND_URL || 'http://localhost:3000'].filter(Boolean),
  plugins: [
    // Media (images and video) lives on Cloudinary. resource_type defaults to
    // 'auto', so Cloudinary decides image vs video from the file itself.
    // Only registered when the credentials are present, so an environment
    // without them falls back to Payload's local disk storage instead of
    // failing every upload.
    ...(cloudinary.cloud_name && cloudinary.api_key && cloudinary.api_secret
      ? [cloudinaryStorage({ cloudConfig: cloudinary, collections: { media: true } })]
      : []),
  ],
})
