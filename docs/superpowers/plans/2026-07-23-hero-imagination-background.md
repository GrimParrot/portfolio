# Hero "Design with imagination" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować izolowaną stronę `/hero-lab` z nową wersją sekcji Hero (`HeroV2`) — ciemny, stonowany, reagujący na mysz "fluid" background (blob-y + spotlight + parallax + drobinki) i migający jak przepalona świetlówka napis "imagination"/"wyobraźnią" — bez dotykania produkcyjnego `Hero.tsx`.

**Architecture:** `HeroV2` (nowa sekcja, reużywa tagline/tagi/przyciski z `Hero.tsx`) renderuje `FlowBackground` (samodzielny komponent tła: rAF-loop z ref-based transformami, bez React state per klatkę) jako warstwę `absolute inset-0` pod contentem. `HeroLab` to cienka strona testowa montowana pod nowym route'em `/hero-lab`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, `motion/react` (tylko `useReducedMotion`), react-router-dom. Zero nowych zależności.

## Global Constraints

- Brak frameworka testów w projekcie — weryfikacja WYŁĄCZNIE przez podgląd w przeglądarce (`preview_start "portfolio"`), zgodnie z CLAUDE.md §1. Każdy krok "test" w tym planie oznacza: uruchom/odśwież preview i zweryfikuj wzrokowo + konsolę, NIE `pytest`/`vitest`.
- Nowe pliki z polskimi znakami (ą ę ó ś ź ż ć ń ł) — NIGDY przez Edit/Write, zawsze przez Node.js `fs.writeFileSync(path, content, 'utf8')` (bez BOM), zgodnie z CLAUDE.md §3.
- `prefers-reduced-motion`: gated przez `useReducedMotion()` z `motion/react` — ten sam wzorzec co w `LocaloCaseStudy.tsx`/`RaportyCaseStudy.tsx`/`BannerozaPage.tsx`.
- Kolor bazowy tła: `#0B1220`. Paleta blobów: indygo `#3B4A7A`, teal `#2E5F5A`, fiolet `#4A3B6B`, zielony akcent portfolio `#0ABA53` (niska opacity, ~18%).
- Nie modyfikujemy `src/components/sections/Hero.tsx` ani `src/App.tsx` w tym planie — wyłącznie nowe pliki + jedna linia routingu w `src/main.tsx`.
- Po każdym tasku: `npm run build` musi przechodzić bez błędów TS.

---

### Task 1: Route `/hero-lab` + szkielet `HeroV2` (statyczny content, bez animacji tła)

**Files:**
- Create: `src/components/sections/HeroV2.tsx`
- Create: `src/pages/HeroLab.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `HeroV2` — komponent bez propsów, eksportowany named export `export function HeroV2()`. Renderuje `<section>` z klasą `hero-flicker` na `<span>` wokół migającego słowa (animacja dodana w Tasku 5).
- Produces: `HeroLab` — strona bez propsów, `export function HeroLab()`, renderuje `<HeroV2 />`.

- [ ] **Step 1: Utwórz `src/components/sections/HeroV2.tsx`**

```tsx
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang } from "@/i18n/LanguageContext"

const tags = ["Lead product designer", "B2B", "B2C", "SaaS", "8+ years exp", "Discovery & Delivery", "AI-powered"]

const copy = {
  pl: {
    headingPre: "Projektuj z ",
    headingFlicker: "wyobraźnią",
    tagline: "projektuję cyfrowe produkty B2B end to end. Pomagam zespołom zdecydować, co budować — i czego nie budować",
    cvBtn: "Zobacz CV",
  },
  en: {
    headingPre: "Design with ",
    headingFlicker: "imagination",
    tagline: "I design digital B2B products end to end. I help teams decide what to build — and what not to build",
    cvBtn: "View CV",
  },
}

export function HeroV2() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 bg-[#0B1220]">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-12">
          {t.headingPre}
          <span className="hero-flicker">{t.headingFlicker}</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-white/10 text-white hover:bg-white/15">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          {t.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-[#0F172A] hover:bg-slate-200">
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">
              {t.cvBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight className="w-4 h-4 animate-nudge-ur" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

Ponieważ plik zawiera polskie znaki, zapisz go przez Node.js (`fs.writeFileSync(path, content, 'utf8')`), nie przez Write/Edit — patrz Global Constraints.

- [ ] **Step 2: Utwórz `src/pages/HeroLab.tsx`**

```tsx
import { HeroV2 } from "@/components/sections/HeroV2"

export function HeroLab() {
  return <HeroV2 />
}
```

- [ ] **Step 3: Dodaj route w `src/main.tsx`**

Dodaj import po istniejącym imporcie `DashboardPage` (linia 18):

```tsx
import { HeroLab } from './pages/HeroLab.tsx'
```

Dodaj route po `<Route path="/ui/dashboard" element={<DashboardPage />} />` (linia 34):

```tsx
          <Route path="/hero-lab" element={<HeroLab />} />
```

- [ ] **Step 4: Weryfikacja w przeglądarce**

Uruchom `preview_start "portfolio"`, przejdź na `/hero-lab`.
Oczekiwany wynik: ciemna sekcja (`#0B1220`) na pełną wysokość, biały nagłówek "Design with imagination" (bez animacji na razie), tagi, tagline i dwa przyciski (biały CV + obrys LinkedIn) czytelne na ciemnym tle. Zero błędów w konsoli.

Sprawdź też wersję PL przez `javascript_tool`: `localStorage.setItem('lang','pl'); location.reload()` — nagłówek powinien pokazać "Projektuj z wyobraźnią".

- [ ] **Step 5: `npm run build`**

Run: `npm run build`
Expected: brak błędów TypeScript.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroV2.tsx src/pages/HeroLab.tsx src/main.tsx
git commit -m "feat: add isolated /hero-lab route with static HeroV2 skeleton"
```

---

### Task 2: `FlowBackground` — dryfujące blob-y gradientowe (bez reakcji na mysz)

**Files:**
- Create: `src/components/sections/hero-v2/FlowBackground.tsx`
- Modify: `src/components/sections/HeroV2.tsx`

**Interfaces:**
- Consumes: nic (samodzielny komponent bez propsów).
- Produces: `FlowBackground` — `export function FlowBackground()`, renderuje `<div className="absolute inset-0 overflow-hidden">` z 4 blobami. Do zamontowania jako pierwsze dziecko `<section>` w `HeroV2`.

- [ ] **Step 1: Utwórz `src/components/sections/hero-v2/FlowBackground.tsx`**

```tsx
import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

type Blob = {
  color: string
  opacity: number
  size: number
  baseX: number
  baseY: number
  driftRadius: number
  speedX: number
  speedY: number
  phase: number
}

const BLOBS: Blob[] = [
  { color: "#3B4A7A", opacity: 0.35, size: 520, baseX: 28, baseY: 38, driftRadius: 60, speedX: 0.00018, speedY: 0.00014, phase: 0 },
  { color: "#2E5F5A", opacity: 0.35, size: 480, baseX: 68, baseY: 30, driftRadius: 50, speedX: 0.00021, speedY: 0.00017, phase: 2.1 },
  { color: "#4A3B6B", opacity: 0.35, size: 460, baseX: 52, baseY: 68, driftRadius: 70, speedX: 0.00016, speedY: 0.0002, phase: 4.2 },
  { color: "#0ABA53", opacity: 0.18, size: 380, baseX: 78, baseY: 72, driftRadius: 45, speedX: 0.00023, speedY: 0.00019, phase: 1.3 },
]

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return

    let raf = 0
    const start = performance.now()

    function tick(now: number) {
      const t = now - start
      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        const driftX = Math.sin(t * blob.speedX + blob.phase) * blob.driftRadius
        const driftY = Math.cos(t * blob.speedY + blob.phase) * blob.driftRadius
        el.style.transform = `translate(${driftX}px, ${driftY}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el }}
          className="absolute rounded-full"
          style={{
            left: `${blob.baseX}%`,
            top: `${blob.baseY}%`,
            width: blob.size,
            height: blob.size,
            marginLeft: -blob.size / 2,
            marginTop: -blob.size / 2,
            background: blob.color,
            opacity: blob.opacity,
            filter: "blur(90px)",
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Podłącz `FlowBackground` w `HeroV2.tsx`**

Dodaj import po istniejących importach:

```tsx
import { FlowBackground } from "./hero-v2/FlowBackground"
```

Zmień początek `return` (dodaj `<FlowBackground />` jako pierwsze dziecko `<section>`, przed `<div className="relative z-10 ...">`):

```tsx
    <section className="relative overflow-hidden pt-28 pb-16 bg-[#0B1220]">
      <FlowBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
```

- [ ] **Step 3: Weryfikacja w przeglądarce**

Odśwież `/hero-lab`. Oczekiwany wynik: 4 rozmyte, kolorowe plamy (indygo/teal/fiolet/zielony) widoczne pod contentem, powoli dryfujące. Zrób screenshot, odczekaj ~2s, zrób drugi screenshot — pozycje blobów powinny się nieznacznie różnić (potwierdza działanie rAF-loopa). Konsola bez błędów.

- [ ] **Step 4: `npm run build`**

Run: `npm run build`
Expected: brak błędów TypeScript.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero-v2/FlowBackground.tsx src/components/sections/HeroV2.tsx
git commit -m "feat: add drifting gradient blobs to hero-lab background"
```

---

### Task 3: Spotlight + parallax reagujące na mysz

**Files:**
- Modify: `src/components/sections/hero-v2/FlowBackground.tsx` (pełna zawartość poniżej)

**Interfaces:**
- Produces: `FlowBackground` bez zmiany sygnatury — nadal `export function FlowBackground()` bez propsów. Dodaje wewnętrzny `pointermove` listener i drugi `<div>` (spotlight) w drzewie.

- [ ] **Step 1: Zastąp całą zawartość `src/components/sections/hero-v2/FlowBackground.tsx`**

```tsx
import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

type Blob = {
  color: string
  opacity: number
  size: number
  baseX: number
  baseY: number
  driftRadius: number
  speedX: number
  speedY: number
  phase: number
  parallax: number
}

const BLOBS: Blob[] = [
  { color: "#3B4A7A", opacity: 0.35, size: 520, baseX: 28, baseY: 38, driftRadius: 60, speedX: 0.00018, speedY: 0.00014, phase: 0, parallax: 0.06 },
  { color: "#2E5F5A", opacity: 0.35, size: 480, baseX: 68, baseY: 30, driftRadius: 50, speedX: 0.00021, speedY: 0.00017, phase: 2.1, parallax: 0.05 },
  { color: "#4A3B6B", opacity: 0.35, size: 460, baseX: 52, baseY: 68, driftRadius: 70, speedX: 0.00016, speedY: 0.0002, phase: 4.2, parallax: 0.07 },
  { color: "#0ABA53", opacity: 0.18, size: 380, baseX: 78, baseY: 72, driftRadius: 45, speedX: 0.00023, speedY: 0.00019, phase: 1.3, parallax: 0.04 },
]

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const spotlightRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (reduceMotion) return
    const container = containerRef.current
    if (!container) return

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      pointer.current.targetX = (e.clientX - rect.left) / rect.width - 0.5
      pointer.current.targetY = (e.clientY - rect.top) / rect.height - 0.5

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`)
        spotlightRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`)
      }
    }

    container.addEventListener("pointermove", handlePointerMove)

    let raf = 0
    const start = performance.now()

    function tick(now: number) {
      const t = now - start
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.05
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.05

      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        const driftX = Math.sin(t * blob.speedX + blob.phase) * blob.driftRadius
        const driftY = Math.cos(t * blob.speedY + blob.phase) * blob.driftRadius
        const parallaxX = pointer.current.x * blob.parallax * 200
        const parallaxY = pointer.current.y * blob.parallax * 200
        el.style.transform = `translate(${driftX + parallaxX}px, ${driftY + parallaxY}px)`
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el }}
          className="absolute rounded-full"
          style={{
            left: `${blob.baseX}%`,
            top: `${blob.baseY}%`,
            width: blob.size,
            height: blob.size,
            marginLeft: -blob.size / 2,
            marginTop: -blob.size / 2,
            background: blob.color,
            opacity: blob.opacity,
            filter: "blur(90px)",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {!reduceMotion && (
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Weryfikacja w przeglądarce**

Odśwież `/hero-lab`. Użyj `computer` (`move`/`hover` lub kilku `left_click` w różnych miejscach + `screenshot`) żeby przesunąć kursor w kilka rogów sekcji. Oczekiwany wynik: widoczna miękka poświata podążająca za kursorem (spotlight) ORAZ blob-y przesuwają się subtelnie w stronę kursora z lekkim opóźnieniem (parallax). Potwierdź przez `javascript_tool`: odczytaj `getComputedStyle` lub `style.getPropertyValue('--mx')` na elemencie spotlightu po ruchu myszy — wartość powinna się zmieniać.

- [ ] **Step 3: `npm run build`**

Run: `npm run build`
Expected: brak błędów TypeScript.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero-v2/FlowBackground.tsx
git commit -m "feat: add mouse-reactive spotlight and parallax to hero background"
```

---

### Task 4: Dryfujące drobinki (particles)

**Files:**
- Modify: `src/components/sections/hero-v2/FlowBackground.tsx`

**Interfaces:**
- Produces: `FlowBackground` bez zmiany sygnatury. Dodaje wewnętrzny typ `Particle` i funkcję `makeParticles()` (lokalne, nieeksportowane).

- [ ] **Step 1: Dodaj generator drobinek — nowy kod po bloku `const BLOBS: Blob[] = [...]`**

```tsx
const PARTICLE_COUNT = 18

type Particle = { left: number; top: number; size: number; duration: number; delay: number }

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 2,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * -10,
  }))
}
```

- [ ] **Step 2: Zmień import `useEffect, useRef` na `useEffect, useMemo, useRef`**

```tsx
import { useEffect, useMemo, useRef } from "react"
```

- [ ] **Step 3: Dodaj `particles` wewnątrz `FlowBackground`, zaraz po `const pointer = useRef(...)`**

```tsx
  const particles = useMemo(makeParticles, [])
```

- [ ] **Step 4: Dodaj render drobinek + lokalne `@keyframes` — po bloku spotlightu, przed zamykającym `</div>`**

```tsx
      {!reduceMotion && particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            animation: `hero-particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes hero-particle-float {
          0%, 100% { transform: translateY(0); opacity: 0.15; }
          50% { transform: translateY(-14px); opacity: 0.5; }
        }
      `}</style>
```

- [ ] **Step 5: Weryfikacja w przeglądarce**

Odśwież `/hero-lab`. Oczekiwany wynik: ~18 drobnych, jasnych kropek rozsianych po tle, każda z własnym powolnym pulsowaniem opacity/unoszeniem. Nie mogą przyciągać nadmiernej uwagi — to subtelny detal, nie fajerwerki. Konsola bez błędów.

- [ ] **Step 6: `npm run build`**

Run: `npm run build`
Expected: brak błędów TypeScript.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/hero-v2/FlowBackground.tsx
git commit -m "feat: add drifting particle layer to hero background"
```

---

### Task 5: Migający efekt "przepalonej świetlówki" na nagłówku

**Files:**
- Modify: `src/components/sections/HeroV2.tsx`

**Interfaces:**
- Produces: klasa CSS `.hero-flicker` (już użyta na `<span>` od Tasku 1) — od tego tasku faktycznie animowana.

- [ ] **Step 1: Dodaj `<style>` jako pierwsze dziecko `<section>`, przed `<FlowBackground />`**

```tsx
      <style>{`
        @keyframes hero-flicker {
          0%, 92%, 100% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
          93% { opacity: 0.4; text-shadow: none; }
          94% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
          95% { opacity: 0.2; text-shadow: none; }
          96%, 99% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
        }
        .hero-flicker {
          animation: hero-flicker 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-flicker {
            animation: none;
            text-shadow: 0 0 24px rgba(10,186,83,0.35);
          }
        }
      `}</style>
```

- [ ] **Step 2: Weryfikacja w przeglądarce**

Odśwież `/hero-lab` i obserwuj nagłówek przez pełne ~8 sekund (`computer` `wait` 9s, potem `screenshot` w trakcie krótkiego zgaśnięcia — jeśli timing się nie złapie za pierwszym razem, to OK, cykl i tak trwa 8s). Oczekiwany wynik: słowo "imagination" świeci stabilnie (z zielonkawym glow) przez większość cyklu, po czym następuje krótka seria migotania (przygaszenie-rozbłysk-przygaszenie) w ostatnich ~10% cyklu, po czym wraca do stabilnego świecenia. Nie powinno wyglądać jak ciągłe, nerwowe stroboskopowanie.

- [ ] **Step 3: `npm run build`**

Run: `npm run build`
Expected: brak błędów TypeScript.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HeroV2.tsx
git commit -m "feat: add burnt-bulb flicker animation to hero headline"
```

---

### Task 6: Końcowa weryfikacja pełnej strony (PL/EN, dostępność, build)

**Files:** brak nowych/modyfikowanych plików — wyłącznie weryfikacja.

- [ ] **Step 1: Pełny build**

Run: `npm run build`
Expected: `tsc -b` i `vite build` przechodzą bez błędów.

- [ ] **Step 2: Weryfikacja EN**

`javascript_tool`: `localStorage.setItem('lang','en'); location.reload()` na `/hero-lab`. Sprawdź: nagłówek "Design with imagination", tagline i przycisk "View CV" po angielsku, link CV wskazuje `/cv-en.pdf`.

- [ ] **Step 3: Weryfikacja PL**

`javascript_tool`: `localStorage.setItem('lang','pl'); location.reload()`. Sprawdź: nagłówek "Projektuj z wyobraźnią", tagline i przycisk "Zobacz CV" po polsku, link CV wskazuje `/cv-pl.pdf`.

- [ ] **Step 4: Kontrast i czytelność**

Zrób screenshot pełnej sekcji w rozdzielczości desktop (1280×800, `resize_window` preset `desktop`) — sprawdź, czy tagi (`Badge`), tagline (`text-slate-300`) i oba przyciski są czytelne na ciemnym tle `#0B1220` z rozmytymi blobami w tle. Jeśli którykolwiek element ginie w tle, zwiększ kontrast (np. `text-slate-300` → `text-slate-200`, lub podnieś opacity `bg-white/10` na tagach) i zanotuj to jako known follow-up zamiast wracać do poprzednich tasków.

- [ ] **Step 5: Konsola**

`read_console_messages` z `onlyErrors: true` — oczekiwany pusty wynik.

- [ ] **Step 6: Commit (jeśli Step 4 wymagał poprawek)**

```bash
git add src/components/sections/HeroV2.tsx
git commit -m "fix: improve contrast of hero content over dark background"
```

Jeśli Step 4 nie wymagał zmian — pomiń ten commit.
