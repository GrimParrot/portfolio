import { Input, Label } from 'portfolio'

export function Default() {
  return <Input placeholder="you@example.com" style={{ maxWidth: 320 }} />
}

export function WithLabel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 320 }}>
      <Label htmlFor="email-preview">Email</Label>
      <Input id="email-preview" type="email" placeholder="you@example.com" />
    </div>
  )
}

export function Disabled() {
  return <Input placeholder="Disabled" disabled style={{ maxWidth: 320 }} />
}
