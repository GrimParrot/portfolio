# Redesign kafli projektów — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zamienić kafle projektów na homepage z obrazka z ciemnym gradientem i tytułem na wierzchu na białą kartę z obrazkiem, tytułem, opisem i tagami.

**Architecture:** Zmiana dotyczy dwóch plików. `src/data/projects.ts` dostaje nowe pole `tags?: string[]`. `src/components/sections/Projects.tsx` dostaje przepisany `ProjectTile` — z propem `size` sterującym skalą typografii, bo ten sam komponent renderuje się w siatce 2-kolumnowej (case studies) i 3-kolumnowej (galeria). Siatka, routing, modal i animacje wejścia zostają nietknięte.

**Tech Stack:** React 19, TypeScript, Tailwind 3.4 (line-clamp w rdzeniu, wartości arbitralne dla easingu i cieni), motion/react, Vite.

**Spec:** [`docs/superpowers/specs/2026-08-24-project-tiles-redesign-design.md`](../specs/2026-08-24-project-tiles-redesign-design.md)

## Global Constraints

- Projekt **nie ma runnera testów** — brak vitest/jest w `package.json`. Weryfikacja to `npm run build` (czyli `tsc -b && vite build`) plus sprawdzenia DOM przez `mcp__Claude_Browser__javascript_tool` na `http://localhost:5173`.
- **Nie pushuj.** Commituj swobodnie, `git push` tylko na wyraźną prośbę użytkowniczki w danej turze.
- Klasy `pf-*` trzymają hex za zmienną CSS, więc **modyfikator przezroczystości na nich nie działa** — `border-pf-line/50` nie zadziała. Do półprzezroczystych wartości używaj standardowych kolorów Tailwinda (`border-black/15`) albo wartości arbitralnych.
- Tokeny do użycia: `border-pf-line` (`#E7E7E7`), `text-pf-ink`, `text-pf-subtle` (`#737373`), `text-pf-muted`, `bg-pf-surface-subtle` (`#F5F5F5`).
- Ikony przycisków w tym projekcie mają `rounded-xl`, nigdy `rounded-full` — nie dotyczy tego zadania, bo strzałka znika, ale nie wprowadzaj jej z powrotem.
- Panel przeglądarki bywa ukryty. Wtedy `getBoundingClientRect()` i zrzuty ekranu **nie są miarodajne** (animacje zamrożone) — weryfikuj przez `offsetWidth`, `textContent` i `getComputedStyle`.
- Refaktor nie zmienia treści: żadnych nowych ani usuniętych tytułów, opisów czy CTA poza tym, co wprost opisuje spec.

---

### Task 1: Pole `tags` w danych projektów

**Files:**
- Modify: `src/data/projects.ts`

**Interfaces:**
- Produces: `Project.tags?: string[]` — opcjonalna lista tagów, czytana przez `ProjectTile` w Task 2 i renderowana jako `project.tags.join(" · ")`.

- [ ] **Step 1: Dodaj pole do interfejsu**

W `src/data/projects.ts`, w `interface Project`, dodaj `tags` tuż pod `tag`:

```ts
export interface Project {
  title: string
  title_pl?: string
  description?: string
  description_en?: string
  tag: ProjectTag
  /** Etykiety pokazywane w stopce kafla, np. ["UI Design", "Branding"].
   *  Po angielsku w obu wersjach językowych — konwencja portfolio
   *  projektowych, i nie mnoży pól w danych. */
  tags?: string[]
  featured?: boolean
  bg: string
  image: string
  imagePosition?: string
  video?: string
  href?: string
}
```

- [ ] **Step 2: Uzupełnij tagi dla wszystkich ośmiu projektów**

W tablicy `projects` dodaj `tags` do każdego wpisu, zaraz po `tag`. Dokładne wartości:

```ts
// Case Study - Automated Reporting
tags: ["Case Study", "Product Design", "UX Research"],

// Case Study - Client Acquisition
tags: ["Case Study", "Product Design", "B2B SaaS"],

// PlanujemyTo
tags: ["UI Design", "Branding", "Design System"],

// Naturalnie.pl
tags: ["UI Design", "Mobile", "E-commerce"],

// Kafejeto.pl
tags: ["UI Design", "E-commerce", "Web"],

// Stats Redesign
tags: ["Product Design", "Data Viz", "Redesign"],

// Profile Dashboard
tags: ["Product Design", "Dashboard", "B2B SaaS"],

// Banner Revolution
tags: ["Web Design", "Landing Page"],
```

Nie usuwaj istniejącego pola `tag` — `ProjectTile` nadal ma proba `showTag`, który go czyta.

- [ ] **Step 3: Sprawdź, że typy się kompilują**

Run: `npx tsc -b`
Expected: brak wyjścia, kod wyjścia 0.

- [ ] **Step 4: Sprawdź, że każdy projekt ma tagi**

Run:

```bash
node -e "const s=require('fs').readFileSync('src/data/projects.ts','utf8');console.log('projekty:',(s.match(/^  \{/gm)||[]).length,'tagi:',(s.match(/tags: \[/g)||[]).length)"
```

Expected: `projekty: 8 tagi: 8`

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts
git commit -m "Give every project a list of tags"
```

---

### Task 2: Nowy `ProjectTile` i tło sekcji

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: `Project.tags?: string[]` z Task 1.
- Produces: `ProjectTile({ project, size, showTag, onOpen })`, gdzie `size: "lg" | "sm"`. `"lg"` dla siatki 2-kolumnowej (case studies), `"sm"` dla 3-kolumnowej (galeria).

- [ ] **Step 1: Usuń import strzałki**

Skasuj linię:

```ts
import { ArrowUpRight } from "lucide-react"
```

To jedyny użytek `lucide-react` w tym pliku — po usunięciu import znika w całości.

- [ ] **Step 2: Uprość `HoverVideo`**

Skalowanie przenosi się na warstwę nad mediami, więc `HoverVideo` przestaje je robić samo. Zamień klasę na samo dopasowanie do kontenera:

```tsx
/** Tile cover video — plays only while hovered, pauses and rewinds on mouse leave. */
function HoverVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.pause()
        el.currentTime = 0
      }}
    />
  )
}
```

Zmieniła się tylko wartość `className` — reszta komponentu bez zmian.

- [ ] **Step 3: Dodaj skalę typografii nad `ProjectTile`**

Wstaw tuż przed definicją `ProjectTile`:

```tsx
type TileSize = "lg" | "sm"

// Ten sam kafel renderuje się w siatce 2-kolumnowej (~570px) i 3-kolumnowej
// (~360px). Skala idzie propem, nie breakpointem, bo o rozmiarze decyduje
// sekcja, w której kafel stoi, a nie szerokość okna.
const tileScale: Record<TileSize, { title: string; description: string }> = {
  lg: { title: "text-[22px]", description: "text-[15px]" },
  sm: { title: "text-[18px]", description: "text-[14px]" },
}
```

- [ ] **Step 4: Przepisz `ProjectTile`**

Zastąp całą dotychczasową funkcję `ProjectTile` poniższą:

```tsx
function ProjectTile({
  project,
  size,
  showTag,
  onOpen,
}: {
  project: Project
  size: TileSize
  showTag: boolean
  onOpen: (project: Project) => void
}) {
  const { lang } = useLang()
  const scale = tileScale[size]
  const title = lang === "pl" && project.title_pl ? project.title_pl : project.title
  const description = lang === "pl" ? project.description : project.description_en ?? project.description

  return (
    // This is the only way into a case study from the homepage, so it has to
    // work from the keyboard. It stays a div rather than becoming a <button>:
    // a button's content model is phrasing content, and the card holds an <h3>.
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen(project)
        }
      }}
      className="group flex h-full cursor-pointer flex-col gap-4 rounded-3xl border border-pf-line bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_10px_20px_-8px_rgba(0,0,0,0.12),0_4px_8px_-4px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Cover — its own rounded block inside the card, not the card itself.
          The scaling layer sits over the media so a video zooms like a photo. */}
      <div
        className={`relative overflow-hidden rounded-2xl ring-1 ring-black/5 ${project.bg}`}
        style={{ aspectRatio: "4/3" }}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
          {project.video ? (
            <HoverVideo src={project.video} poster={project.image} />
          ) : (
            <img
              src={project.image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: project.imagePosition ?? "center" }}
            />
          )}
        </div>
      </div>

      {/* Title and description — flex-1 so the tag line stays pinned to the
          bottom even when a neighbouring card in the row is taller. */}
      <div className="flex flex-1 flex-col gap-2 px-1">
        {showTag && (
          <span className="inline-block self-start rounded-xl bg-pf-surface-subtle px-3.5 py-2 text-sm font-semibold text-pf-body">
            {project.tag}
          </span>
        )}
        <h3 className={`${scale.title} font-semibold leading-snug tracking-tight text-pf-ink`}>{title}</h3>
        {description && (
          <p className={`${scale.description} line-clamp-2 leading-normal text-pf-subtle`}>{description}</p>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <p className="px-1 pb-1 text-[12px] tracking-tight text-pf-muted">{project.tags.join(" · ")}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Przekaż `size` w obu siatkach i zmień tło sekcji**

W komponencie `Projects` zmień trzy miejsca.

Tło sekcji — z `bg-white` na `bg-pf-surface-subtle`, żeby białe karty odbiły się od tła:

```tsx
<section id="projects" className="pt-24 pb-40 bg-pf-surface-subtle">
```

Siatka case studies — dochodzi `size="lg"`:

```tsx
{featured.map((project) => (
  <ProjectTile key={project.title} project={project} size="lg" showTag={false} onOpen={open} />
))}
```

Siatka galerii — dochodzi `size="sm"`, a `motion.div` dostaje `h-full`, żeby kafel rozciągnął się na wysokość rzędu:

```tsx
<motion.div
  key={project.title}
  layout
  layoutId={`project-card-${project.title}`}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
  className="h-full"
>
  <ProjectTile project={project} size="sm" showTag={false} onOpen={open} />
</motion.div>
```

- [ ] **Step 6: Zbuduj projekt**

Run: `npm run build`
Expected: build przechodzi, kod wyjścia 0. Gdyby `tsc` zgłosił nieużywany import `ArrowUpRight` — wróć do Kroku 1, linia została.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "Rebuild the project tile as a card with a description and tags"
```

---

### Task 3: Weryfikacja w przeglądarce

**Files:**
- Modify (tylko jeśli weryfikacja coś wykaże): `src/data/projects.ts`, `src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: gotowy `ProjectTile` z Task 2 i `tags` z Task 1.
- Produces: nic — to bramka jakości przed oddaniem pracy.

- [ ] **Step 1: Uruchom podgląd**

Użyj `mcp__Claude_Browser__preview_start` z `{"name": "portfolio"}`. Zwrócony `tabId` przekazuj do kolejnych wywołań. Nie uruchamiaj serwera przez Bash.

- [ ] **Step 2: Sprawdź, że wszystkie osiem kafli ma komplet treści**

Uruchom przez `mcp__Claude_Browser__javascript_tool`:

```js
(()=>{const tiles=[...document.querySelectorAll('#projects [role="button"]')];
return JSON.stringify({count:tiles.length, cards:tiles.map(t=>({
  title:t.querySelector('h3')?.textContent,
  desc:(t.querySelector('p.line-clamp-2')?.textContent||'').slice(0,40),
  tags:t.querySelector('p:not(.line-clamp-2)')?.textContent,
  visible:t.offsetWidth>0&&t.offsetHeight>0
})).slice(0,8)},null,1)})()
```

Expected: `count: 8`, każda karta ma niepusty `title`, `desc`, `tags`, i `visible: true`.

- [ ] **Step 3: Sprawdź, że opis jest przycięty do dwóch linijek**

```js
(()=>{const p=document.querySelector('#projects p.line-clamp-2');
const cs=getComputedStyle(p);
return JSON.stringify({clamp:cs.webkitLineClamp, overflow:cs.overflow, lines:Math.round(p.offsetHeight/parseFloat(cs.lineHeight))})})()
```

Expected: `clamp: "2"`, `overflow: "hidden"`, `lines` równe 1 albo 2.

- [ ] **Step 4: Sprawdź, które opisy zostały ucięte**

Spec przewiduje, że najdłuższy opis (Kafejeto, 103 znaki) nie zmieści się w dwóch linijkach w siatce 3-kolumnowej.

```js
(()=>{return [...document.querySelectorAll('#projects p.line-clamp-2')]
 .map(p=>({txt:p.textContent.slice(0,30), clipped:p.scrollHeight>p.clientHeight+1}))})()
```

Zapisz wynik. Dla każdego `clipped: true` przeczytaj pełny opis w `src/data/projects.ts` i oceń, czy ucięte zdanie nadal ma sens. Jeśli traci sens — skróć je w danych do ok. 85 znaków, zachowując znaczenie, i zrób osobny commit `Trim the tile descriptions that no longer fit`. Jeśli sens się broni, nie zmieniaj nic i zanotuj to w podsumowaniu.

- [ ] **Step 5: Sprawdź, że przełącznik języka działa**

Odczytaj tytuł i opis pierwszego kafla, kliknij `LangToggle` w navbarze przez `mcp__Claude_Browser__computer`, odczytaj ponownie.

```js
(()=>{const t=document.querySelector('#projects [role="button"]');
return {title:t.querySelector('h3').textContent, desc:t.querySelector('p.line-clamp-2').textContent}})()
```

Expected: po przełączeniu oba pola zmieniają treść na drugi język. Tagi zostają te same — to zamierzone.

- [ ] **Step 6: Sprawdź, że kafel nadal otwiera modal**

Kliknij pierwszy kafel galerii przez `mcp__Claude_Browser__computer`, potem:

```js
(()=>({url:location.pathname, modal:!!document.querySelector('[role="dialog"]')}))()
```

Expected: `url` to ścieżka projektu (np. `/ui/planujemyto`), `modal: true`. Następnie `history.back()` i sprawdź, że `modal` wraca do `false`.

- [ ] **Step 7: Oddaj do oceny wzrokowej**

Poproś użytkowniczkę o odsłonięcie panelu przeglądarki i ocenę hovera — unoszenia karty, ciemnienia ramki i skalowania obrazka. Przy ukrytym panelu te animacje są zamrożone i nie da się ich zweryfikować programowo.

- [ ] **Step 8: Commit poprawek, jeśli jakieś były**

Jeśli Kroki 4–6 nie wymusiły zmian, nie ma czego commitować — przejdź dalej.

```bash
git status --short
```

---

## Rollback

Zmiana siedzi w dwóch plikach i trzech commitach. Cofnięcie całości:

```bash
git revert --no-commit HEAD~2..HEAD && git commit -m "Revert the project tile redesign"
```

Cofnięcie samych pojedynczych decyzji jest tańsze i nie wymaga reverta:

- **Strzałka wraca** — przywróć import `ArrowUpRight` i wstaw `<span>` ze strzałką w bloku tytułu.
- **Białe tło sekcji wraca** — `bg-pf-surface-subtle` z powrotem na `bg-white`.
- **Tagi znikają z kafla** — usuń ostatni `<p>` z `ProjectTile`; pole `tags` w danych może zostać.
