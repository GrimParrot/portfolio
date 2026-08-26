# Hero — nowa koncepcja: zdanie zamiast tytułu stanowiska

**Data:** 2026-08-26
**Plik:** `src/components/sections/HeroV2.tsx`
**Dotyczy:** homepage (`App.tsx`) oraz poligonu `/hero-lab` — to ten sam komponent, zmiana obejmuje oba miejsca.

## Problem

Obecny hero krzyczy tytułem stanowiska: „Cześć, jestem Edyta" (mała linia) nad gigantycznym `Product / Designer` w dwóch liniach po 13rem. Mówi **kim Edyta jest**, ale nie mówi **co robi ani jak**. „Product Designer" to kategoria, którą ma na stronie kilkaset tysięcy osób — nie różnicuje.

## Rozwiązanie

Tożsamość schodzi do jednej małej linii, a rolę głównego nagłówka przejmuje zdanie o sposobie pracy.

```
        Cześć, jestem Edyta i Product Designer      ← mała linia

        Tworzę produkty end-to-end
        — z AI i z okiem
        na realnych ludzi                            ← <h1>, font-black

        [B2B] [B2C] [SaaS] [8+ lat doświadczenia] [zorientowana na AI]

              ( Zobacz moje projekty ↓ )
```

## Zakres zmian

| Element | Dziś | Po zmianie |
|---|---|---|
| Mała linia | „Cześć, jestem Edyta" | „Cześć, jestem Edyta i Product Designer" |
| `<h1>` treść | `Product` `<br>` `Designer` | całe zdanie, bez twardego łamania |
| `<h1>` skala | `clamp(2.75rem, 13vw, 13rem)` | `clamp(2.25rem, 6.5vw, 5.5rem)` |
| `<h1>` interlinia | `leading-[0.9]` | `leading-[0.95]` |
| `<h1>` łamanie | `<br>` | `text-wrap: balance` + `max-width` |
| Tagi | 5 badge'y | **bez zmian** |
| CTA + Magnetic | „Zobacz moje projekty" | **bez zmian** |
| Tło (Plasma) | `#0A0A0A`, opacity 0.3 | **bez zmian** |
| `SkillsMarquee` | z-20, gradient 800px | **bez zmian** |
| Warstwy z-index | z-30 na treści | **bez zmian** |

## Teksty (obie wersje językowe)

| Klucz | PL | EN |
|---|---|---|
| `name` | Cześć, jestem Edyta i Product Designer | Hi, I'm Edyta, a Product Designer |
| `heading` | Tworzę produkty end-to-end — z AI i z okiem na realnych ludzi | I build products end-to-end with AI and eyes on real people |
| `workBtn` | Zobacz moje projekty | See my work |
| `tags` | B2B, B2C, SaaS, 8+ lat doświadczenia, zorientowana na AI | B2B, B2C, SaaS, 8+ years exp, AI-oriented |

`headingLine1` / `headingLine2` znikają — zastępuje je pojedynczy `heading`.

## Uzasadnienie decyzji typograficznych

1. **`font-black` zostaje.** Waga 900 to znak firmowy obecnego hero. Zmieniamy treść, nie charakter.
2. **13vw → 6.5vw to konsekwencja, nie preferencja.** Zdanie ma ~55 znaków w PL; przy 13rem nie mieści się na żadnym realnym ekranie.
3. **`text-wrap: balance` zamiast `<br>`.** Twarde łamanie wymagałoby osobnych punktów podziału dla PL (dłuższe zdanie) i EN, i tak rozjechałoby się na tablecie. `balance` wyrównuje długości linii sam, w obu językach.
4. **`leading-[0.95]` zamiast `0.9`.** Przy trzech liniach ciasnego tekstu 0.9 skleja wyrastające znaki (ł, j, ę) — w `Product / Designer` problem nie występował, bo żadna litera nie schodziła pod linię bazową.

## Poza zakresem

- Tło Plasma i jego parametry
- `SkillsMarquee` i jego gradient
- Nawigacja, CTA, animacje wejścia
- Hero na podstronach case study (`HeroStagger` — inny komponent)

## Kryteria akceptacji

- [ ] Nagłówek czyta się w 3 liniach na desktopie (1440px) w PL i EN
- [ ] Na 375px nic nie wychodzi poza viewport i nie ma poziomego scrolla
- [ ] Sekcja nadal mieści się w `min-h-screen` bez przycięcia CTA
- [ ] Przełącznik PL/EN podmienia oba teksty
- [ ] `npm run build` przechodzi bez błędów TypeScript i lintu
