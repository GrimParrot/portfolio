import { Card, CardHeader, CardTitle, CardContent } from 'portfolio'

export function Default() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
          Lead-to-demo conversion rose 32% within the first quarter after launch.
        </p>
      </CardContent>
    </Card>
  )
}
