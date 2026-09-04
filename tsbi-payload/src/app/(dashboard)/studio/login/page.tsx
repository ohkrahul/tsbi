import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import { LoginForm } from '@/components/studio/forms'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function StudioLoginPage() {
  if (await currentUser()) redirect('/studio')

  return (
    <div className="bg-muted/40 grid min-h-svh place-items-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md text-xs font-black">
              T
            </span>
            <CardTitle>TSBI Studio</CardTitle>
          </div>
          <CardDescription>Sign in with your Payload account.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="text-muted-foreground mt-4 text-xs">
            No account yet? Create the first user in the{' '}
            <a href="/admin" className="underline">
              Payload admin
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
