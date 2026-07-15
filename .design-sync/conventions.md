## Conventions

**No provider needed.** These components (Button, Badge, Card family, Input, Label) are plain shadcn/ui-style primitives — no ThemeProvider, context, or wrapper required. Import and render directly.

**Styling idiom: Tailwind utility classes, merged via `cn()`.** Each component composes fixed Tailwind classes internally (e.g. Button is `rounded-xl font-bold ...`); pass additional classes via `className` and they merge correctly (last one wins on conflicts) rather than duplicate. Never restyle by wrapping with new CSS — override via `className` on the component itself.

**Brand color/spacing tokens — real CSS custom properties, use these names:**

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#0F172A` | headings, dark button bg |
| `--color-primary-hover` | `#1E293B` | dark button hover |
| `--color-accent-green` | `#0ABA53` | global accent |
| `--color-box-gray` | `#94A3B814` | flat card background (~8% opacity) |
| `--color-box-gray-soft` | `#94A3B80D` | lighter flat background (~5% opacity) |
| `--color-accent-localo` / `--color-accent-raporty` | `#466AFA` | blue project accent |
| `--color-accent-naturalnie` | `#32685B` | green project accent |
| `--color-accent-kafejeto` | `#8EBD3F` | lime project accent |
| `--color-accent-banneroza` | `#DD8100` | orange project accent |
| `--spacing-card-padding` | `2.5rem` (40px) | card padding, desc→image gap |
| `--spacing-grid-gap` | `1.5rem` (24px) | standard grid gap |
| `--radius-button` | `0.75rem` (12px) | buttons, badges |
| `--radius-box` | `1.5rem` (24px) | large image cards |
| `--radius-statcard` | `1.125rem` (18px) | stat tiles |

Use `var(--token-name)` in new compositions instead of hardcoding these hex/rem values.

**Where the truth lives:** `styles.css` → `_ds_bundle.css` carries the full compiled stylesheet (Tailwind utilities actually used + the tokens above). Read it before styling anything outside what these 10 components already cover.

**Idiomatic build snippet:**

```tsx
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'portfolio'

<Card style={{ maxWidth: 360 }}>
  <CardHeader>
    <CardTitle>Client Acquisition</CardTitle>
    <CardDescription>How Localo doubled inbound leads.</CardDescription>
  </CardHeader>
  <CardContent>
    <Badge variant="secondary">B2B</Badge>
  </CardContent>
  <CardFooter>
    <Button size="sm">Read case study</Button>
  </CardFooter>
</Card>
```

**Note:** this sync covers only the reusable UI primitives (`src/components/ui/`). The richer case-study-specific patterns (FeatureCard, StatCard, lessons grid, callout box) live inline in individual page files, not as importable components — see the repo's `docs/DESIGN_SYSTEM.md` for those, they are not part of this bundle.
