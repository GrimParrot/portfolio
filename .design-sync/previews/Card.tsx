import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'portfolio'

export function Default() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Client Acquisition</CardTitle>
        <CardDescription>How Localo doubled inbound leads with a redesigned onboarding flow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
          Product design case study — discovery, delivery, and the metrics that moved.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Read case study</Button>
      </CardFooter>
    </Card>
  )
}

export function Simple() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <CardContent style={{ paddingTop: 24 }}>
        <p style={{ margin: 0 }}>A card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  )
}
