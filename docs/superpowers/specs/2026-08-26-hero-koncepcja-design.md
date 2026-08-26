# Hero — nowa koncepcja: zdanie zamiast tytułu stanowiska

**Data:** 2026-08-26
**Plik:** `src/components/sections/HeroV2.tsx`
**Dotyczy:** homepage (`App.tsx`) oraz poligonu `/hero-lab` — to ten sam komponent, zmiana obejmuje oba miejsca.

## Problem

Obecny hero krzyczy tytułem stanowiska: „Cześć, jestem Edyta" (mała linia) nad gigantycznym `Product / Designer` w dwóch liniach po 13rem. Mówi **kim Edyta jest**, ale nie mówi **co robi ani jak**. „Product Designer" to kategoria, którą ma na stronie kilkaset tysięcy osób — nie różnicuje.

## Rozwiązanie

Tożsamość schodzi do eyebrow w wersalikach, a rolę głównego nagłówka przejmuje zdanie o sposobie pracy. Układ editorialowy: rozstrzelony nadtytuł, pod nim mocny bold z ciasną interlinią, zakończony kropką.

```
        CZEŚĆ, JESTEM EDYTA, PRODUCT DESIGNER        ← eyebrow, wersaliki

        Tworzę produkty end-to-end
        z AI i z okiem na realnych ludzi.             ← <h1>, bold

        [B2B] [B2C] [SaaS] [8+ lat doświadczenia] [zorientowana na AI]

              ( Zobacz moje projekty ↓ )
```

## Zakres zmian

| Element | Dziś | Po zmianie |
|---|---|---|
| Nadtytuł treść | „Cześć, jestem Edyta" | „Cześć, jestem Edyta, Product Designer" |
| Nadtytuł styl | `text-base md:text-lg font-medium` | `text-xs md:text-sm font-semibold uppercase` + tracking, `text-muted-foreground` |
| `<h1>` treść | `Product` `<br>` `Designer` | zdanie łamane twardym `<br>` po „end-to-end", z kropką |
| `<h1>` waga | `font-black` (900) | `font-bold` (700) + `tracking-tight` |
| `<h1>` skala | `clamp(2.75rem, 13vw, 13rem)` | `clamp(1.1rem, calc((100vw - 48px) / 16), 4.75rem)` |
| `<h1>` interlinia | `leading-[0.9]` | `leading-[0.95]` |
| Tagi | 5 badge'y | **bez zmian** |
| CTA + Magnetic | „Zobacz moje projekty" | **bez zmian** |
| Tło (Plasma) | `#0A0A0A`, opacity 0.3 | **bez zmian** |
| `SkillsMarquee` | z-20, gradient 800px | **bez zmian** |
| Warstwy z-index | z-30 na treści | **bez zmian** |

## Teksty (obie wersje językowe)

| Klucz | PL | EN |
|---|---|---|
| `name` | Cześć, jestem Edyta, Product Designer | Hi, I'm Edyta, Product Designer |
| `headingLine1` | Tworzę produkty end-to-end | I build products end-to-end |
| `headingLine2` | z AI i z okiem na realnych ludzi. | with AI and eyes on real people. |
| `workBtn` | Zobacz moje projekty | See my work |
| `tags` | B2B, B2C, SaaS, 8+ lat doświadczenia, zorientowana na AI | B2B, B2C, SaaS, 8+ years exp, AI-oriented |

Wersaliki robi CSS (`uppercase`), nie zapis w źródle — dzięki temu tekst zostaje czytelny w pliku i nie psuje się przy przełączaniu języka.

## Skąd wzięły się liczby

Wszystkie wartości pochodzą z pomiarów realnego renderu w przeglądarce, nie z szacunków.

1. **Dzielnik 16 w `calc`.** Najszerszy wiersz to angielskie „with AI and eyes on real people." — ~14.9em w wadze 700 z `tracking-tight`, mimo że polski ma więcej znaków. Decyduje szerokość liter (`w`, `m`), nie ich liczba. Reszta to zapas na różnice w renderowaniu fontu.
2. **`calc(100vw - 48px)`, nie samo `vw`.** `px-6` zabiera 24px z każdej strony. Wersja oparta na czystym `5.8vw` łamała angielski wiersz na trzeci na 375px, bo `vw` nie widzi paddingu.
3. **Cap 4.75rem.** Kontener ma `max-w-[1200px]` minus `px-6`, czyli 1152px dostępnych. Przy 76px najszerszy wiersz zajmuje 1094px.
4. **Pomiar na ukrytym elemencie zaniża o ~3%.** Przy cap 5rem angielski wiersz potrzebował 1155px przy 1152px dostępnych i pękał na trzeci, mimo że pomiar na sondzie mówił, że się zmieści.
5. **Tracking eyebrow 0.12em na mobile, 0.18em od `md`.** Polski nadtytuł ma 37 znaków; przy 0.18em samo rozstrzelenie zjada 80px, wiersz potrzebował 336px przy 327px dostępnych i łamał się po „EDYTA,", zostawiając osierocone „DESIGNER".

## Zmierzony wynik

Język angielski wyznacza skalę, bo jest szerszy.

| Szerokość | `h1` | Wiersze | Zapas do krawędzi |
|---|---|---|---|
| 375px | 20.4px | 2 | EN 33px · PL 41px |
| 768px | 45px | 2 | 44px |
| 1024px | 61px | 2 | 58px |
| 1280–1920px | 76px | 2 | EN 58px · PL 89px |

Nadtytuł mieści się w jednym wierszu w obu językach na każdej szerokości. Nigdzie nie ma poziomego scrolla, CTA mieści się w `min-h-screen`.

## Poza zakresem

- Tło Plasma i jego parametry
- `SkillsMarquee` i jego gradient
- Nawigacja, CTA, animacje wejścia
- Hero na podstronach case study (`HeroStagger` — inny komponent)

## Kryteria akceptacji

- [x] Nagłówek czyta się w 2 wierszach na każdej szerokości w PL i EN
- [x] Nadtytuł mieści się w jednym wierszu w obu językach
- [x] Na 375px nic nie wychodzi poza viewport i nie ma poziomego scrolla
- [x] Sekcja nadal mieści się w `min-h-screen` bez przycięcia CTA
- [x] Przełącznik PL/EN podmienia oba teksty
- [x] ESLint i `tsc --noEmit` przechodzą bez błędów
