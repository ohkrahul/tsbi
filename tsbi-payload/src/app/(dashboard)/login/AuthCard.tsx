import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/** The centred card the sign-in, forgot and reset screens all sit in. */
export function AuthCard({
  description,
  children,
}: {
  description: string
  children: React.ReactNode
}) {
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
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
