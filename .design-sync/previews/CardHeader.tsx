import { Card, CardHeader, CardTitle, CardDescription } from 'portfolio'

export function Default() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Report automation</CardTitle>
        <CardDescription>Cuts manual data pulls from 40 minutes to under 5.</CardDescription>
      </CardHeader>
    </Card>
  )
}
