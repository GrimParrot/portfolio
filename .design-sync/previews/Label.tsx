import { Label, Input } from 'portfolio'

export function Default() {
  return <Label htmlFor="name-preview">Full name</Label>
}

export function WithInput() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 320 }}>
      <Label htmlFor="name-preview-2">Full name</Label>
      <Input id="name-preview-2" placeholder="Jane Doe" />
    </div>
  )
}
