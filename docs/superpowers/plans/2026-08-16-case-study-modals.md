# Case study jako modale — plan implementacji

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raporty i Client Acquisition otwierają się w modalu nad stroną główną, tak samo jak pozostałe pięć projektów.

**Architecture:** Trzy niezależne kroki. Najpierw ramka modala przestaje narzucać szerokość treści, a kolumnę 1200px przejmują komponenty, które na niej polegały — to zmiana czysto refaktorowa, po której galeria wygląda identycznie. Potem oba case study tracą chrome strony (navbar, przycisk powrotu, stopka). Na końcu przełączamy routing: `galleryPaths()` zwraca wszystkie `href`, a dwa route'y zamieniają się we wpisy w mapie `modalContent`.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind, React Router, motion/react, Lenis.

**Spec:** [docs/superpowers/specs/2026-08-16-case-study-modals-design.md](../specs/2026-08-16-case-study-modals-design.md)

## Global Constraints

- Projekt nie ma testów automatycznych. Cykl weryfikacji każdego zadania to `npm run build` + sprawdzenie w preview (`preview_start "portfolio"`, port 5173).
- `npm run build` musi przejść przed każdym commitem — Vercel odpala pełny `tsc -b` przy deployu.
- `git push` tylko na wyraźną prośbę użytkowniczki. Commitować można swobodnie.
- Żadnych zmian w treści (copy, nagłówki, CTA) — to przeprowadzka układu, nie redakcja.
- Pliki z polskimi znakami: nigdy nie twórz ich od zera przez Write/Edit. Edycja istniejącej linii przez Edit jest w porządku.
- Nie ruszamy: układu siatki na stronie głównej, przełącznika PL/EN, stopki Contact w modalu, `NextProject.tsx`.

## File Structure

| Plik | Odpowiedzialność po zmianie |
|---|---|
| `src/components/ProjectModal.tsx` | Ramka, scroll (Lenis) i zamykanie. Nie decyduje o szerokości treści. |
| `src/components/SimpleProjectPage.tsx` | Treść czterech projektów UI/Web + własna kolumna 1200px. |
| `src/pages/BannerozaPage.tsx` | Treść Banneroza + własna kolumna 1200px. |
| `src/pages/RaportyCaseStudy.tsx` | Treść case study Raporty jako zawartość modala. |
| `src/pages/ClientAcquisitionCaseStudy.tsx` | Treść case study Client Acquisition jako zawartość modala. |
| `src/data/projects.ts` | Lista projektów; `galleryPaths()` = wszystkie `href`. |
| `src/main.tsx` | Router — bez osobnych route'ów case study. |
| `src/components/sections/Projects.tsx` | Siatka + mapa `modalContent` dla wszystkich siedmiu projektów. |
| `src/components/BackToPortfolio.tsx` | **usunięty** — bez użyć po zdjęciu chrome'u. |

---

### Task 1: Ramka modala przestaje narzucać szerokość

**Files:**
- Modify: `src/components/ProjectModal.tsx:106-110`
- Modify: `src/components/SimpleProjectPage.tsx:132`
- Modify: `src/pages/BannerozaPage.tsx:202-210`

**Interfaces:**
- Consumes: nic (pierwsze zadanie).
- Produces: `ProjectModal` renderuje `children` w kontenerze pełnej szerokości. Każda zawartość modala odpowiada odtąd sama za swoją kolumnę — Task 3 na tym polega, bo case study wnoszą własną szerokość przez `Section`.

- [ ] **Step 1: Zrób punkt odniesienia w preview**

Uruchom preview (`preview_start "portfolio"`) i otwórz przy szerokości 1440px dwa adresy, robiąc screenshot każdego: `http://localhost:5173/ui/naturalnie` oraz `http://localhost:5173/case-study/banneroza`. Zapamiętaj, gdzie kończy się kolumna treści — po zmianie ma być w tym samym miejscu.

- [ ] **Step 2: Zdejmij cap z ProjectModal**

W `src/components/ProjectModal.tsx` zamień linie 106-110:

```tsx
            <div ref={scrollRef} className="pretty-scrollbar h-full overflow-y-auto rounded-3xl" data-lenis-prevent>
              <div ref={contentRef} className="max-w-[1200px] mx-auto">
                {children}
              </div>
            </div>
```

na:

```tsx
            <div ref={scrollRef} className="pretty-scrollbar h-full overflow-y-auto rounded-3xl" data-lenis-prevent>
              {/* Pełna szerokość ramki: sekcje case study rozlewają tło do
                  krawędzi modala, a o kolumnę treści dba już sama zawartość.
                  Ten div zostaje mimo braku klas — Lenis modala dostaje go jako
                  content i bez niego przestaje mierzyć wysokość treści. */}
              <div ref={contentRef}>
                {children}
              </div>
            </div>
```

- [ ] **Step 3: Oddaj kolumnę SimpleProjectPage**

W `src/components/SimpleProjectPage.tsx` zamień linię 132:

```tsx
      <div className="px-6 sm:px-10 pt-14 pb-10">
```

na:

```tsx
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 pb-10">
```

- [ ] **Step 4: Oddaj kolumnę BannerozaPage**

W `src/pages/BannerozaPage.tsx` zamień linię 210 (identyczna treść jak wyżej, inny plik):

```tsx
      <div className="px-6 sm:px-10 pt-14 pb-10">
```

na:

```tsx
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 pb-10">
```

- [ ] **Step 5: Zbuduj**

Run: `npm run build`
Expected: `built in ...` bez błędów `tsc`.

- [ ] **Step 6: Porównaj z punktem odniesienia**

Przeładuj preview i otwórz wszystkie pięć modali galerii: `/ui/naturalnie`, `/ui/kafejeto`, `/ui/stats`, `/ui/dashboard`, `/case-study/banneroza`.
Expected: każdy wygląda dokładnie jak w Step 1 — kolumna treści w tym samym miejscu, brak poziomego scrolla. Sprawdź 375px (`resize_window` preset mobile). Przewiń modal kółkiem myszy — scroll Lenis nadal płynny, co potwierdza, że `contentRef` przeżył zmianę. Konsola bez błędów.

- [ ] **Step 7: Commit**

```bash
git add src/components/ProjectModal.tsx src/components/SimpleProjectPage.tsx src/pages/BannerozaPage.tsx
git commit -m "Let modal content decide its own width"
```

---

### Task 2: Zdjęcie chrome'u strony z obu case study

**Files:**
- Modify: `src/pages/RaportyCaseStudy.tsx` (importy 1-16, otwarcie komponentu 191-196, hero 203-206, zakończenie 709-716)
- Modify: `src/pages/ClientAcquisitionCaseStudy.tsx` (importy 1-14, otwarcie komponentu 234-239, hero 246-249, zakończenie 693-700)
- Delete: `src/components/BackToPortfolio.tsx`

**Interfaces:**
- Consumes: nic z Taska 1 — zmiany są rozłączne.
- Produces: `RaportyCaseStudy()` i `ClientAcquisitionCaseStudy()` zwracają jeden `<div id="top">` z samą treścią case study, bez `Navbar`, `BackToPortfolio` i `Contact`. Task 3 wstawia je w tej postaci do mapy `modalContent`.

- [ ] **Step 1: Usuń trzy importy w RaportyCaseStudy**

W `src/pages/RaportyCaseStudy.tsx` usuń linie:

```tsx
import { Navbar } from "@/components/Navbar"
import { Contact } from "@/components/sections/Contact"
```

oraz:

```tsx
import { BackToPortfolio } from "@/components/BackToPortfolio"
```

- [ ] **Step 2: Przepisz otwarcie komponentu Raporty**

Zamień linie 191-196:

```tsx
  return (
    <>
      <Navbar />
      <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(96px, 14vw, 160px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

        <ChapterRail chapters={chapters} />
```

na:

```tsx
  return (
    // padding: bez fixed navbara nie ma czego omijać, więc górna rezerwa
    // schodzi z clamp(96px, 14vw, 160px) do oddechu porównywalnego z Banneroza.
    <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

      <ChapterRail chapters={chapters} topOffset={24} />
```

Fragment `<>` zniknął, więc cała zawartość między otwarciem a zamknięciem traci jeden poziom wcięcia — popraw wcięcie całego bloku, żeby plik pozostał czytelny.

- [ ] **Step 3: Usuń przycisk powrotu z hero Raporty**

Zamień linie 203-206:

```tsx
                <div className="flex items-center gap-4">
                  <BackToPortfolio />
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                </div>
```

na sam `<span>` (opakowujący flex-row miał sens tylko z dwoma dziećmi):

```tsx
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
```

- [ ] **Step 4: Przepisz zakończenie Raporty**

Zamień linie 709-716:

```tsx
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 128px", boxSizing: "border-box" }}>
      </div>
      <Contact />
    </>
  )
}
```

na:

```tsx
    </div>
  )
}
```

Pusty div dawał 128px prześwitu nad stopką, której już nie ma — dolny padding wrappera wystarcza.

- [ ] **Step 5: Powtórz to samo w ClientAcquisitionCaseStudy**

Usuń te same trzy importy. Otwarcie komponentu (linie 234-239) zamień na:

```tsx
  return (
    // padding: bez fixed navbara nie ma czego omijać, więc górna rezerwa
    // schodzi z clamp(96px, 14vw, 160px) do oddechu porównywalnego z Banneroza.
    <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

      <ChapterRail chapters={chapters} topOffset={24} />
```

Hero (linie 246-249) zamień na:

```tsx
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
```

Zakończenie (linie 693-700) zamień na:

```tsx
    </div>
  )
}
```

Tu również popraw wcięcie całej zawartości po usunięciu fragmentu.

- [ ] **Step 6: Usuń BackToPortfolio**

```bash
git rm src/components/BackToPortfolio.tsx
```

Run: `grep -rn "BackToPortfolio" src/`
Expected: brak trafień. Jeśli coś wyskoczy, zatrzymaj się i napraw, zanim ruszysz dalej.

- [ ] **Step 7: Zbuduj**

Run: `npm run build`
Expected: `built in ...`. Najbardziej prawdopodobny błąd na tym etapie to nieużywany import (`TS6133`) — usuń go.

- [ ] **Step 8: Sprawdź obie strony w preview**

Strony wciąż mają własne route'y, więc otwórz `http://localhost:5173/case-study/raporty` i `http://localhost:5173/case-study/client-acquisition`.
Expected: brak navbara, brak przycisku powrotu przy eyebrow, brak stopki na dole. Nagłówek ma oddech u góry i nie klei się do krawędzi. Klik w ChapterRail przewija do rozdziału, aktywna kropka wędruje przy scrollu. Konsola bez błędów.

- [ ] **Step 9: Commit**

```bash
git add src/pages/RaportyCaseStudy.tsx src/pages/ClientAcquisitionCaseStudy.tsx src/components/BackToPortfolio.tsx
git commit -m "Strip the page chrome off the two case studies"
```

---

### Task 3: Przełączenie routingu na modal

**Files:**
- Modify: `src/data/projects.ts:17-22`
- Modify: `src/main.tsx:22-23, 37-42`
- Modify: `src/components/sections/Projects.tsx:8-22, 138-139`
- Modify: `src/styles/raporty-ds.css:9-12`

**Interfaces:**
- Consumes: `RaportyCaseStudy` i `ClientAcquisitionCaseStudy` w postaci z Taska 2 (sama treść, bez chrome'u) oraz `ProjectModal` bez capa szerokości z Taska 1.
- Produces: `galleryPaths(): string[]` zwraca wszystkie `href` z `projects`. Po tym zadaniu nie ma projektu, który otwiera się inaczej niż w modalu.

- [ ] **Step 1: Rozszerz galleryPaths**

W `src/data/projects.ts` zamień linie 17-22:

```ts
/** Paths that open a project modal over the homepage instead of a page of
 *  their own. The router, the scroll guard and the modal all read this one
 *  list, so a gallery entry cannot end up addressable in one of them and not
 *  the others. Deriving it from `featured` keeps it in step with the grid. */
export const galleryPaths = (): string[] =>
  projects.filter((p) => !p.featured && p.href).map((p) => p.href as string)
```

na:

```ts
/** Paths that open a project modal over the homepage instead of a page of
 *  their own — which is now every project with an address. The router, the
 *  scroll guard and the modal all read this one list, so an entry cannot end
 *  up addressable in one of them and not the others.
 *
 *  This used to be derived from `!featured`, back when the two featured case
 *  studies had pages of their own. They don't: `featured` now means only
 *  "large tile in the highlighted row" and says nothing about routing. */
export const galleryPaths = (): string[] =>
  projects.filter((p) => p.href).map((p) => p.href as string)
```

- [ ] **Step 2: Usuń dwa route'y i dwa importy z main.tsx**

W `src/main.tsx` usuń linie 22-23:

```tsx
import { RaportyCaseStudy } from './pages/RaportyCaseStudy.tsx'
import { ClientAcquisitionCaseStudy } from './pages/ClientAcquisitionCaseStudy.tsx'
```

oraz linie 37-38:

```tsx
            <Route path="/case-study/raporty" element={<RaportyCaseStudy />} />
            <Route path="/case-study/client-acquisition" element={<ClientAcquisitionCaseStudy />} />
```

Komentarz nad mapą `galleryPaths` (linie 39-42) mówi dziś "Gallery projects are modals" — zamień go na:

```tsx
            {/* Every project is a modal, not a page — but each keeps a real URL
                so opening one registers as a navigation in analytics and can be
                linked to directly. They render the homepage; the modal opens
                because Projects reads the path. */}
```

- [ ] **Step 3: Dopisz dwa wpisy do modalContent**

W `src/components/sections/Projects.tsx` dopisz importy obok pozostałych stron:

```tsx
import { RaportyCaseStudy } from "@/pages/RaportyCaseStudy"
import { ClientAcquisitionCaseStudy } from "@/pages/ClientAcquisitionCaseStudy"
```

i rozszerz mapę (linie 16-22) do pełnej siódemki — kolejność jak w `projects.ts`:

```tsx
const modalContent: Record<string, () => React.ReactNode> = {
  "/case-study/raporty": () => <RaportyCaseStudy />,
  "/case-study/client-acquisition": () => <ClientAcquisitionCaseStudy />,
  "/ui/naturalnie": () => <NaturalniePage />,
  "/ui/kafejeto": () => <KafejetoPage />,
  "/case-study/banneroza": () => <BannerozaPage />,
  "/ui/stats": () => <StatsPage />,
  "/ui/dashboard": () => <DashboardPage />,
}
```

- [ ] **Step 4: Popraw nieaktualny komentarz przy open()**

Zamień linie 138-139:

```tsx
  // Featured projects navigate to their own page, gallery projects to their
  // modal URL — same call either way, the router decides what that path means.
```

na:

```tsx
  // Every project navigates to its own URL, and that URL renders the homepage
  // with a modal over it — being featured changes the tile, not the opening.
```

- [ ] **Step 5: Popraw uzasadnienie scope'u w raporty-ds.css**

Zamień linie 10-12:

```css
/* Scoped to #top (unique to this page) so it can't leak to other pages
   bundled in the same app-wide stylesheet. */
#top b, #top strong { color: var(--pf-text-primary); }
```

na:

```css
/* Scoped to #top, the case-study wrapper. Both case studies use that id, but
   at most one is ever mounted — they are modal content now, and the homepage
   underneath has no #top, so the rule has nowhere to leak. */
#top b, #top strong { color: var(--pf-text-primary); }
```

- [ ] **Step 6: Zbuduj**

Run: `npm run build`
Expected: `built in ...` bez błędów.

- [ ] **Step 7: Pełna weryfikacja w preview**

Przeładuj preview i przejdź całą listę:

1. Kafelek "Case study - Automatyczne raporty" otwiera modal, adres zmienia się na `/case-study/raporty`.
2. To samo dla Client Acquisition (`/case-study/client-acquisition`).
3. Odświeżenie strony na `/case-study/raporty` pokazuje modal nad homepage — nie białą stronę i nie przekierowanie na `/`.
4. Pasy `subtle` i `dark` dochodzą do zaokrąglonej krawędzi modala. To jest główny efekt wizualny całej zmiany.
5. Klik w ChapterRail przewija kontener modala, a nie stronę pod spodem; aktywna kropka reaguje na scroll.
6. Zamknięcie przez X, Esc i Back — każde wraca na homepage i zostawia siatkę w tym samym miejscu scrolla.
7. Pięć modali galerii bez zmian względem Taska 1.
8. 375px: rail ukryty, brak poziomego scrolla, modal scrolluje się palcem.
9. Konsola bez błędów.

- [ ] **Step 8: Commit**

```bash
git add src/data/projects.ts src/main.tsx src/components/sections/Projects.tsx src/styles/raporty-ds.css
git commit -m "Open every project the same way"
```

---

## Po planie

Poza zakresem, do decyzji użytkowniczki: `NextProject.tsx` nie ma już żadnego użycia i można go usunąć osobnym commitem.
