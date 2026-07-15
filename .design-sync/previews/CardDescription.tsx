import { Card, CardHeader, CardTitle, CardDescription } from 'portfolio'

export function Default() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Discovery sprint</CardTitle>
        <CardDescription>
          Two weeks of user interviews, competitive analysis, and a validated problem statement.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
