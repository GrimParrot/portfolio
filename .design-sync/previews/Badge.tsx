import { Badge } from 'portfolio'

export function Default() {
  return <Badge>Badge</Badge>
}

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}

export function TagPills() {
  const tags = ['Lead product designer', 'B2B', 'B2C', 'SaaS', '8+ years exp']
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
          {tag}
        </Badge>
      ))}
    </div>
  )
}
