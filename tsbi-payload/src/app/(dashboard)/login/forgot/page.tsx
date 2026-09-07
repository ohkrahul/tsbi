import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { ForgotPasswordForm } from '@/components/studio/forms'
import { AuthCard } from '../AuthCard'

export default async function ForgotPasswordPage() {
  if (await currentUser()) redirect('/studio')
  return (
    <AuthCard description="We'll email you a link to set a new password.">
      <ForgotPasswordForm />
    </AuthCard>
  )
}
