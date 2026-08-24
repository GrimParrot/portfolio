# Kafle projektów na homepage — nowy wygląd i treść

Data: 2026-08-24

## Problem

Kafel projektu na homepage to dziś obrazek 4:3 z ciemnym gradientem u dołu, a na
gradiencie tytuł i strzałka `↗` w kółku. Niesie jedną informację — nazwę projektu.
Opisy, które istnieją w `src/data/projects.ts` (PL i EN, po jednym zdaniu na
projekt), nie trafiają nigdzie na stronę główną. Tag (`UI` / `Web` / `Case Study`)
też jest w danych, ale wyłączony przez `showTag={false}`.

Referencja, którą wskazała użytkowniczka: <https://rbp-portfolio.vercel.app/>.

## Rozwiązanie

Kafel przestaje być obrazkiem z napisem na wierzchu. Staje się białą kartą, w
której obrazek jest osobnym blokiem, a tekst siedzi pod nim.

### Anatomia karty

```
<article>  rounded-3xl · border-pf-line · bg-white · p-3.5
           shadow: 0 1px 2px rgba(0,0,0,.04)
│
├── obrazek   rounded-2xl · overflow-hidden · ring-1 ring-black/5
│             aspect-ratio 4/3 · tło = project.bg
│             (wewnątrz warstwa absolutna, która skaluje się przy hoverze)
├── tytuł     pf-ink · font-semibold
├── opis      pf-subtle · line-clamp-2
└── tagi      12px · pf-muted · "UI Design · Branding · Design System"
```

Obrazek zostaje w proporcji 4:3 — stałej, nie naturalnej jak w referencji.
Referencja używa siatki masonry, gdzie różne wysokości kart są cechą układu.
Tutaj siatka jest rzędowa, więc obrazki o różnych proporcjach rozjechałyby rzędy.

### Dwa rozmiary typografii

Karty mają różne szerokości w zależności od sekcji, więc typografia skaluje się
przez propa (`size: "lg" | "sm"`), a nie przez breakpointy.

| | case studies (2 kol., ~570px) | galeria (3 kol., ~360px) |
|---|---|---|
| tytuł | 22px | 18px |
| opis | 15px, `line-clamp-2` | 14px, `line-clamp-2` |
| tagi | 12px | 12px |

### Hover

| element | zmiana | czas | easing |
|---|---|---|---|
| karta | `translateY(-4px)` | 0.4s | `cubic-bezier(.22,1,.36,1)` |
| ramka | `#E7E7E7` → `rgba(0,0,0,.14)` | 0.4s | ta sama |
| cień | `0 10px 20px -8px rgba(0,0,0,.12)`, `0 4px 8px -4px rgba(0,0,0,.08)` | 0.4s | ta sama |
| obrazek | `scale(1.06)` | 0.7s | ta sama |

Wideo (`project.video`, dziś tylko Kafejeto) zachowuje się jak dotąd: startuje na
`mouseenter`, pauzuje i przewija do zera na `mouseleave`. Skalowanie obrazka
dotyczy warstwy nad `<img>` / `<video>`, więc obejmuje oba przypadki tak samo.

### Co znika

- **Strzałka `↗` w kółku** — karta unosi się przy hoverze, co wystarczy za sygnał
  klikalności. Strzałka na białej karcie stałaby się dodatkowym elementem
  konkurującym z tytułem.
- **Ciemny gradient** — nie ma już czego przyciemniać, tekst zszedł z obrazka.

### Tło sekcji

`#projects` zmienia tło z `bg-white` na `pf-surface-subtle` (`#F5F5F5`). Bez tego
białe karty na białym tle trzymałaby tylko ramka `#E7E7E7`.

## Dane

Nowe pole w `Project` (`src/data/projects.ts`):

```ts
tags?: string[]
```

Tagi po angielsku w obu wersjach językowych — nie mnoży pól w danych i jest
zgodne z konwencją portfolio projektowych. Jeśli okaże się to zgrzytem, dochodzi
`tags_pl?: string[]` bez zmiany komponentu.

| projekt | `tags` |
|---|---|
| Case Study - Automated Reporting | `["Case Study", "Product Design", "UX Research"]` |
| Case Study - Client Acquisition | `["Case Study", "Product Design", "B2B SaaS"]` |
| PlanujemyTo | `["UI Design", "Branding", "Design System"]` |
| Naturalnie.pl | `["UI Design", "Mobile", "E-commerce"]` |
| Kafejeto.pl | `["UI Design", "E-commerce", "Web"]` |
| Stats Redesign | `["Product Design", "Data Viz", "Redesign"]` |
| Profile Dashboard | `["Product Design", "Dashboard", "B2B SaaS"]` |
| Banner Revolution | `["Web Design", "Landing Page"]` |

Tagi renderują się jako zwykły tekst rozdzielony `·`, nie jako pigułki. Trzy
pigułki `rounded-xl px-3.5 py-2` (badge z design systemu) na karcie szerokiej na
360px zabrałyby tytułowi połowę uwagi.

Opis czytany jest z istniejących pól: `description` dla PL, `description_en` dla
EN — tak samo jak tytuł czyta `title_pl` z fallbackiem na `title`.

Pole `tag: ProjectTag` zostaje w typie, bo `showTag` nadal istnieje w API
komponentu, ale nie jest używane na homepage.

## Czego nie ruszamy

- Siatka: 2 kolumny w case studies, 3 w galerii. Bez zmian.
- Podział na „Wybrane case study" i „Galeria projektów". Bez zmian.
- `AnimatePresence` + `layout` / `layoutId` na kartach galerii — przejście w modal
  zostaje.
- Routing, `galleryPaths()`, `modalContent`, `ProjectModal`.
- Treść tytułów i opisów.

## Zakres zmian w plikach

| plik | zmiana |
|---|---|
| `src/data/projects.ts` | pole `tags?: string[]` w interfejsie + wartości dla 8 projektów |
| `src/components/sections/Projects.tsx` | przepisany `ProjectTile` (nowa struktura, prop `size`), `HoverVideo` opakowany warstwą skalującą, tło sekcji, usunięty import `ArrowUpRight` |

Nowych plików CSS nie ma. Krzywa easingu, cień i skalowanie idą przez wartości
arbitralne Tailwinda (`ease-[cubic-bezier(.22,1,.36,1)]`,
`hover:shadow-[0_10px_20px_-8px_rgba(0,0,0,.12)]`,
`group-hover:scale-[1.06]`), tak jak reszta projektu.

## Weryfikacja

Panel przeglądarki w tej sesji jest ukryty, więc zrzuty ekranu i pomiary
`getBoundingClientRect()` nie są miarodajne (animacje zamrożone). Sprawdzamy:

1. `npm run build` przechodzi (`tsc -b` złapie brak `tags` w typie).
2. `document.querySelectorAll('#projects article').length === 8`.
3. Na każdej karcie: tytuł, opis i linia tagów są w DOM, a `offsetWidth > 0`.
4. Opis w galerii ma `-webkit-line-clamp: 2` w `getComputedStyle`.
5. Klik w kartę nadal nawiguje pod `project.href` i otwiera modal.
6. Przełączenie PL/EN zmienia tytuł i opis na karcie.

Hover i unoszenie karty użytkowniczka ocenia wzrokowo przy odsłoniętym panelu.

## Ryzyka

- **Opisy w galerii mogą się ucinać.** Przy 360px i 14px w linii mieści się ~45
  znaków, więc dwie linijki to ~90 znaków. Najdłuższy opis (Kafejeto, 103 znaki)
  zostanie przycięty. `line-clamp-2` obcina z wielokropkiem, co jest akceptowalne,
  ale jeśli któryś opis traci sens w połowie — do skrócenia w danych.
- **Karty w jednym rzędzie będą różnej wysokości**, jeśli któryś tytuł zawinie się
  na dwie linijki, a sąsiedni nie. Siatka CSS wyrówna wysokość kart, więc obrazki
  zostaną w linii, a różnica wypadnie na dole karty.
