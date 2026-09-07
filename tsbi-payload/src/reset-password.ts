/**
 * Set a studio password from the command line.
 *
 * The in-app "Forgot password?" flow emails a reset link, which needs an email
 * adapter configured on the Payload config. Until one is, Payload writes that
 * email to the server log instead of sending it — so this is the reliable way
 * to get back in, and the way to set a password for someone else.
 *
 * Run:  npm run reset:password -- someone@tsbi.in "the new password"
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const args = process.argv.slice(2).filter((a) => a !== '--')
const [email, password] = args

if (!email || !password) {
  console.error('Usage: npm run reset:password -- <email> <new password>')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Use at least 8 characters.')
  process.exit(1)
}

const payload = await getPayload({ config })

const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
const user = docs[0]
if (!user) {
  const all = await payload.find({ collection: 'users', limit: 50, depth: 0 })
  console.error(`No account for "${email}". Existing accounts:`)
  for (const u of all.docs) console.error(`  - ${(u as { email?: string }).email}`)
  process.exit(1)
}

await payload.update({ collection: 'users', id: user.id, data: { password } })
console.log(`Password updated for ${email}. Sign in at ${process.env.CMS_URL || 'http://localhost:3001'}/login`)
process.exit(0)
