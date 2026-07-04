# Portfolio Edyta — Specyfikacja dla Claude Code

## 1. Środowisko i komendy

- **Dev server:** `npm run dev` → port 5173. W sesji z preview używaj `preview_start "portfolio"` zamiast Bash.
- **Build:** `npm run build` (weryfikacja TypeScript + Vite bundle)
- **Testy:** brak — weryfikacja przez preview w przeglądarce
- **Stack:** React 19 · Vite · TypeScript · Tailwind CSS · shadcn/ui · lucide-react · React Router

## 2. Architektura — gdzie co leży

```
src/
  components/
    sections/        # Hero, Projects, Contact, About
    ui/              # shadcn: button, badge, itp.
    Navbar.tsx
    Footer.tsx
    ProjectNav.tsx   # nawigacja między case studies
    NextProject.tsx
  pages/             # case study pages (LocaloCaseStudy, RaportyCaseStudy, ...)
  copy/              # dwujęzyczne teksty: [projekt].copy.tsx
  data/
    projects.ts      # lista projektów na homepage
  i18n/
    LanguageContext.tsx
  main.tsx           # React Router — tu rejestrujemy nowe route'y
  index.css          # custom keyframe animations
```

## 3. Krytyczna reguła — polskie znaki w plikach

**Nigdy nie używaj Edit ani Write do tworzenia od zera pliku zawierającego polskie znaki (ą ę ó ś ź ż ć ń ł).**
Zawsze pisz przez PowerShell z UTF-8 no-BOM:

```powershell
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("ścieżka\do\pliku.tsx", $content, $utf8NoBom)
```

Wyjątek: Edit/Write działają przy **edytowaniu istniejącego** pliku (np. zmiana jednej linii) — nowe pliki i pełne przepisy zawsze przez PowerShell.

## 4. Design tokens

| Token | Wartość |
|-------|---------|
| Kolor ciemny (primary) | `#0F172A` |
| Kolor hover ciemny | `#1E293B` |
| Akcent zielony (portfolio) | `#0ABA53` |
| Font | Manrope (global, `index.css`) |
| Meta labels (Produkt, Skala…) | `text-slate-400` (szary) — Tag bez `color` prop |
| Border-radius buttonów | `rounded-xl` (12px) — zmienione globalnie w `button.tsx` |
| Border-radius badge'ów | `rounded-xl` (12px) — zmienione globalnie w `badge.tsx` |
| Font weight buttonów | `font-bold` — zmienione globalnie w `button.tsx` |

Kolory akcentów per case study:
- Localo: `#466AFA`
- Raporty: `#6366F1`
- Banner Revolution: `#FEC400`

## 5. Dwujęzyczność (PL/EN)

Każdy tekst ma wariant `pl` i `en`. Wzorzec:

```tsx
// src/copy/[projekt].copy.tsx
export const copy = { pl: { ... }, en: { ... } }

// w komponencie:
const { lang } = useLang()
const t = copy[lang]
```

Język przełącza `LanguageContext` — nie hardkoduj polskich stringów bezpośrednio w komponentach.

## 6. Dodawanie nowego case study

1. Utwórz `src/copy/[nazwa].copy.tsx` (przez PowerShell jeśli są polskie znaki)
2. Utwórz `src/pages/[Nazwa]CaseStudy.tsx` — wzoruj na `RaportyCaseStudy.tsx`
3. Dodaj route w `src/main.tsx`
4. Dodaj projekt do `src/data/projects.ts` (zostaw zakomentowany/usunięty jeśli WIP)

## 7. Animacje CSS (index.css)

Zdefiniowane keyframes:
- `animate-nudge-ur` — strzałka ArrowUpRight (LinkedIn, Contact)
- `animate-wave` — emoji 👋 w Hero
- `animate-bounce` — ArrowDown w Hero (Tailwind built-in)
- `animate-grid-a/b/c` — nieużywane (zostawione, można usunąć)

## 8. Workflow po zmianach UI

Po edycji komponentu widocznego w przeglądarce:
1. Odśwież przez `preview_eval: window.location.reload()`
2. Sprawdź `preview_console_logs` pod kątem błędów
3. Zrób screenshot lub inspect dla potwierdzenia

## 9. Git

Branch: `master`. Push bezpośrednio — brak CI/CD pipeline wymagającego PR.
