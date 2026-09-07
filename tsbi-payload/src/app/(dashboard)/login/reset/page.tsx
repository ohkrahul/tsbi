import Link from 'next/link'
import { ResetPasswordForm } from '@/components/studio/forms'
import { AuthCard } from '../AuthCard'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const raw = sp.token
  const token = (Array.isArray(raw) ? raw[0] : raw) ?? ''

  if (!token) {
    return (
      <AuthCard description="This link is missing its reset token.">
        <p className="text-muted-foreground text-sm">
          Reset links expire. <Link href="/login/forgot" className="underline">Request a new one</Link>.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard description="Choose a new password for your account.">
      <ResetPasswordForm token={token} />
    </AuthCard>
  )
}
