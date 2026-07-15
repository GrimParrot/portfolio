import { Card, CardHeader, CardTitle, CardFooter, Button } from 'portfolio'

export function Default() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Case study</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button size="sm" variant="outline">
          Read more
        </Button>
      </CardFooter>
    </Card>
  )
}
