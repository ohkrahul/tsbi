import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: {
    // Payload's default reset link points at /admin, which this app no longer
    // serves — send people to the studio's own reset screen instead.
    forgotPassword: {
      generateEmailSubject: () => 'Reset your TSBI Studio password',
      generateEmailHTML: (args) => {
        const token = (args as { token?: string } | undefined)?.token ?? ''
        const base = process.env.CMS_URL || 'http://localhost:3001'
        const url = `${base}/login/reset?token=${token}`
        return [
          '<p>Someone asked to reset the password on your TSBI Studio account.</p>',
          `<p><a href="${url}">Set a new password</a></p>`,
          "<p>If that wasn't you, ignore this email — nothing has changed.</p>",
        ].join('')
      },
    },
  },
  fields: [
    { name: 'name', type: 'text' },
  ],
}
