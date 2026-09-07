import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { LoginForm } from '@/components/studio/forms'
import { AuthCard } from './AuthCard'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>
}) {
  if (await currentUser()) redirect('/studio')
  const sp = await searchParams

  return (
    <AuthCard description="Sign in with your Payload account.">
      {sp.reset ? (
        <p className="mb-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
          Password updated — sign in with it.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  )
}
