# Hero "Design with imagination" — nowe tło i nagłówek (design)

Data: 2026-07-23

## Cel

Nowa wersja sekcji Hero na stronie głównej portfolio: duży wyśrodkowany nagłówek
"Design with imagination" / "Projektuj z wyobraźnią" z migającą (jak przepalona
świetlówka) drugą częścią zdania, na ciemnym, stonowanym, płynnie poruszającym się
tle reagującym na ruch myszki (spotlight + parallax). Reszta treści (tagline, tagi,
przyciski CV/LinkedIn) zostaje przeniesiona bez zmian funkcjonalnych z obecnego
[Hero.tsx](../../../src/components/sections/Hero.tsx).

**Na razie budujemy to jako izolowaną stronę testową** (`/hero-lab`), NIE podmieniamy
jeszcze produkcyjnego Hero na stronie głównej. Docelowo (po akceptacji wizualnej)
`HeroV2` zastąpi `Hero` w `App.tsx`.

Referencje wizualne (inspiracja, nie kopiowanie 1:1):
- https://mesh3d.gallery/the-state-of-the-gallery — ciemne, nastrojowe tło,
  dryfujące świecące drobinki/pyłki, duży bold nagłówek
- https://www.helloshivam.com/ — płynne, "rozlewające się" kolorowe smugi
  reagujące na kursor (ale tam neonowo-jaskrawe — u nas mają być stonowane)

## Zakres

- Nowy komponent `src/components/sections/HeroV2.tsx` — docelowy zamiennik Hero
- Nowy komponent tła `src/components/sections/hero-v2/FlowBackground.tsx`
- Nowa strona testowa `src/pages/HeroLab.tsx` (renderuje samo `<HeroV2 />`)
- Nowy route `/hero-lab` w `src/main.tsx`
- Reużycie: `tags`, tagline, przyciski CV/LinkedIn z obecnego `Hero.tsx` (ta sama
  struktura `copy.pl`/`copy.en`, `useLang()`, komponenty `Badge`/`Button`)
- BEZ zmian w `Hero.tsx` ani `App.tsx` na tym etapie (brak podmiany produkcyjnej)

## Treść nagłówka

```ts
const copy = {
  en: { headingPre: "Design with ", headingFlicker: "imagination" },
  pl: { headingPre: "Projektuj z ", headingFlicker: "wyobraźnią" },
}
```

Migające jest zawsze drugie słowo/fraza (`headingFlicker`) — w obu językach ta sama
mechanika, różny tekst. Reszta treści (tagline, `tags`, `cvBtn`) kopiowana 1:1
z obecnego `Hero.tsx`.

## Tło — podejście CSS/Canvas (bez pełnej symulacji WebGL fluid)

Trzy warstwy, ułożone `absolute inset-0` wewnątrz sekcji z `overflow-hidden`,
pod contentem (content ma `relative z-10`):

1. **Blob-y gradientowe (3-4 szt.)** — `div`-y z `radial-gradient`, duży `filter: blur(...)`,
   `mix-blend-mode: screen` (na ciemnym tle daje efekt "przelewania się" kolorów
   bez konieczności prawdziwej fizyki płynów). Pozycja każdego blobu liczona w
   `requestAnimationFrame`:
   `x = baseX + sin(t * driftSpeed + phase) * driftRadius + parallaxOffsetX * parallaxFactor`
   (analogicznie `y`), gdzie `parallaxOffsetX/Y` to znormalizowana pozycja
   kursora względem środka sekcji, wygładzana przez `lerp` klatka po klatce (żeby
   ruch miał lekki "lag", nie 1:1 skok za kursorem). Bez zewnętrznej biblioteki
   noise — organiczność z nałożenia kilku sinusoid o różnych częstotliwościach/fazach
   per blob.
2. **Spotlight** — jeden `div` z `radial-gradient(circle, ...)`, pozycja aktualizowana
   BEZPOŚREDNIO przez `ref.style.setProperty` na `mousemove` (nie przez React state
   — unikamy re-renderu przy każdym ruchu myszy), `mix-blend-mode: soft-light`,
   umiarkowana intensywność (nie jaskrawy "flashlight", tylko delikatne rozjaśnienie
   okolic kursora).
3. **Drobinki (~15-20 szt.)** — małe `div`-y (2-4px, blur, niska opacity), rozstawione
   losowo (wygenerowane raz przy mount, `useMemo`/moduł-level), każda z własną,
   bardzo powolną animacją unoszenia (CSS `@keyframes` translateY + opacity pulse,
   zróżnicowany `animation-duration`/`delay` per drobinka) — nawiązanie do
   dryfującego pyłku z mesh3d, bez osobnego systemu cząstek/canvas.

### Paleta (stonowana, oparta o markę portfolio)

| Element | Kolor |
|---|---|
| Tło bazowe | `#0B1220` (ciemniejszy odcień istniejącego `#0F172A`) |
| Blob 1 | przygaszony indygo `#3B4A7A` |
| Blob 2 | przygaszony teal `#2E5F5A` |
| Blob 3 | przygaszony fiolet `#4A3B6B` |
| Blob 4 (akcent) | zielony akcent portfolio `#0ABA53` przy niskiej opacity (~15-20%) — muśnięcie marki, nie dominujący kolor |
| Drobinki | biały/jasny szary przy niskiej opacity |

Dokładne wartości (opacity blobów, rozmiar blur, promień driftu, siła parallaxy)
będą strojone wizualnie na żywo w przeglądarce po pierwszej implementacji — to
nie są liczby "świętej krowy", tylko punkt startowy.

## Flicker "imagination" / "wyobraźnią"

CSS `@keyframes` na `<span>` obejmującym `headingFlicker`, z nieregularnymi
progami opacity/`text-shadow` (glow), np.:

```css
@keyframes bulb-flicker {
  0%, 92%, 100% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
  93% { opacity: 0.4; text-shadow: none; }
  94% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
  95% { opacity: 0.2; text-shadow: none; }
  96%, 99% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
}
```

`animation: bulb-flicker 8s infinite;` — cały cykl trwa ~8s, właściwe "miganie"
zajmuje ułamek cyklu (kilka % na końcu), reszta czasu tekst świeci stabilnie.
Dokładny rytm i barwa glow (prawdopodobnie zielony akcent `#0ABA53` dla spójności
z marką) do dostrojenia na żywo.

## Dostępność — `prefers-reduced-motion`

Analogicznie do istniejącego `HeroStagger` (gated przez `useReducedMotion()`
z `motion/react`): przy włączonej preferencji reduced-motion —
- blob-y i drobinki zamrożone w pozycji startowej (brak `requestAnimationFrame`-loop)
- spotlight nieaktywny (nie nasłuchujemy `mousemove` albo nasłuchujemy, ale bez
  wizualnego efektu)
- flicker wyłączony — `headingFlicker` renderuje się statycznie, w pełni "zapalone"

## Przyciski na ciemnym tle

Obecny `Button` primary (`bg-[#0F172A]`) i `variant="outline"` są dobrane pod
jasne tło Hero. Na nowym ciemnym tle wymagają override kontrastu na tej konkretnej
instancji (przez `className`, zgodnie z zasadą z `DESIGN_SYSTEM.md` §4 — nie
zmieniamy globalnych CSS variables `--secondary` itp.):
- primary CV button → jasne tło / jasny tekst (odwrócony kontrast względem wersji light)
- outline LinkedIn button → jasna obwódka/tekst zamiast ciemnej

## Weryfikacja

Brak testów automatycznych (zgodnie z konwencją projektu — weryfikacja przez
podgląd). Po implementacji: `preview_start "portfolio"` → `/hero-lab`, sprawdzenie:
- ruch myszką realnie przesuwa spotlight i blob-y (parallax + lag)
- flicker na "imagination"/"wyobraźnią" wygląda jak przepalona świetlówka, nie
  irytujący ciągły strobo-efekt
- czytelność nagłówka i przycisków na ciemnym tle (kontrast)
- przełączenie PL/EN podmienia zarówno prefiks jak i migające słowo
- brak błędów w konsoli, `npm run build` przechodzi bez błędów TS
