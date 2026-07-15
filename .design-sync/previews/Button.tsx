import { Button } from 'portfolio'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

export function Default() {
  return <Button>View CV</Button>
}

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function WithIcon() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button size="lg" style={{ backgroundColor: '#0F172A' }}>
        View CV <ArrowDown style={{ width: 16, height: 16 }} />
      </Button>
      <Button size="lg" variant="outline">
        LinkedIn <ArrowUpRight style={{ width: 16, height: 16 }} />
      </Button>
    </div>
  )
}

export function Disabled() {
  return <Button disabled>Disabled</Button>
}
