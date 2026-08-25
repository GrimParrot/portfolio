# Design System — Portfolio Edyta

Źródło prawdy dla kolorów, typografii, spacingu, komponentów UI, wzorców sekcji case study i animacji. **Przy tworzeniu nowego elementu zawsze sprawdź najpierw tutaj**, zamiast wymyślać nowy odcień/spacing/wzorzec od zera.

Ten plik zastępuje dawne sekcje 4 i 7 [CLAUDE.md](../CLAUDE.md) — reszta CLAUDE.md (architektura, i18n, workflow assetów, git) zostaje bez zmian.

---

## 1. Kolory

### Zasada nadrzędna

**Nie wpisuj kolorów jako hex i nie używaj palety `slate` z Tailwinda.** Wszystkie kolory mieszkają w `src/styles/tokens.css` i są dostępne jako klasy `pf-*` (mapowanie w `tailwind.config.js`). W stylach inline użyj zmiennej: `style={{ color: "var(--pf-text-primary)" }}`.

| Zamiast | Użyj | Wartość |
|---|---|---|
| `#0F172A`, `text-slate-900`, `#000` | `text-pf-ink` / `bg-pf-900` | `#0A0A0A` |
| hover primary `#1E293B` | `hover:bg-pf-800` | `#282828` |
| `text-slate-700`, `text-slate-600` | `text-pf-700` | `#474747` |
| `text-slate-500` (opisy) | `text-pf-subtle` | `#737373` |
| `text-slate-400` (meta labels) | `text-pf-500` | `#848484` |
| `border-slate-200` | `border-pf-line` | `#E7E7E7` |
| `border-slate-300` | `border-pf-200` | `#D4D4D4` |
| `border-slate-100`, `bg-slate-50` | `border-pf-50` / `bg-pf-50` | `#F5F5F5` |
| `#94A3B814` (flat box) | `bg-pf-surface-subtle` | `#F5F5F5` |
| zieleń `#0ABA53` | `text-pf-green` | `#0ABA53` |
| akcent niebieski `#466AFA` | `text-pf-accent-500` | `#466AFA` |

**Ograniczenie:** klasy `pf-*` trzymają hex za zmienną CSS, więc **modyfikator przezroczystości nie działa** — `bg-pf-ink/50` nie zadziała, zejdź o stopień w skali. Dotyczy to zwłaszcza hoverów: `bg-primary/90` komponuje się z tłem pod przyciskiem, przez co ten sam przycisk wygląda inaczej w navbarze (półprzezroczysta pigułka) niż w hero.

**Jedyne miejsce, gdzie hex musi zostać** (ma komentarz w kodzie): `<Plasma color="#0A0A0A">` w `HeroV2.tsx` i `Contact.tsx` — komponent parsuje kolor przez `hexToRgb()` do uniformu WebGL, więc `var()` wywali wyjątek.

### Skala

Neutralna: `pf-900` `#0A0A0A` · `pf-850` `#141414` · `pf-800` `#282828` · `pf-700` `#474747` · `pf-500` `#848484` · `pf-300` `#C2C2C2` · `pf-200` `#D4D4D4` · `pf-100` `#E7E7E7` · `pf-50` `#F5F5F5`

Role tekstu: `pf-ink` (nagłówki) · `pf-body` · `pf-subtle` (opisy) · `pf-muted` · `pf-faint` · `pf-on-dark` / `pf-on-dark-body` / `pf-on-dark-muted`

Powierzchnie: `pf-surface` · `pf-surface-subtle` · `pf-surface-dark` · `pf-surface-dark-card`. Obramowania: `pf-line`.

Akcent niebieski: `pf-accent-900/700/500/300/100/50`. Zieleń marki: `pf-green`. Semantyczne: `pf-success-*`, `pf-error-*`.

**Kontrast:** `pf-muted` (`#848484`, 4.0:1 na białym) **nie spełnia AA** dla małego tekstu — do opisów używaj `pf-subtle` (`#737373`, 4.9:1). `pf-muted` zostaw dla etykiet i elementów dekoracyjnych.

### Most shadcn

`src/index.css` trzyma drugi zestaw (`--primary`, `--border`, `--foreground`…) w formacie HSL. To **nie jest** drugie źródło prawdy — wartości lustrzane wobec `tokens.css`, a format HSL istnieje tylko dlatego, że Tailwind potrzebuje go do modyfikatorów przezroczystości, których nadal używają `badge.tsx` i linki w navbarze. Zmieniasz kolor → najpierw `tokens.css`, potem lustrzana poprawka tam.

### Callout box (rola/pivot/warning)
Tło `var(--pf-surface-accent)` (`#E3E9FE`), tekst w kolorze PRIMARY danego case study, `rounded-lg px-6 py-5`.

### Akcent per case study (aktualny stan w kodzie — sprawdzone `grep`, nie ufaj starym notatkom)
| Case study | Gdzie zdefiniowany | Wartość |
|---|---|---|
| Raporty | `var(--pf-accent-500)` | `#466AFA` |
| Client Acquisition | `var(--pf-accent-500)` | `#466AFA` — ten sam niebieski co Raporty |
| Naturalnie | `copy/naturalnie.copy.tsx` + `data/projects.ts` | `#32685B` |
| Kafejeto | `copy/kafejeto.copy.tsx` + `data/projects.ts` | `#8EBD3F` |
| Banneroza | `const PRIMARY` w `BannerozaPage.tsx` | `#DD8100` — karta na homepage (`data/projects.ts`) używa INNEGO gradientu `#FEC400 → #d4a300`, celowo różnego od in-page accent |

Dwa najnowsze case studies (Raporty, Client Acquisition) nie mają już własnej stałej — biorą akcent wprost z tokenu. Starsze strony trzymają swój kolor lokalnie.

**Przy dodawaniu nowego case study:** jeśli akcentem ma być firmowy niebieski, użyj `var(--pf-accent-500)` / `text-pf-accent-500`. Jeśli projekt ma własny kolor, dodaj go do `tokens.css` jako `--pf-cs-[nazwa]` i stamtąd czytaj — nie rozsypuj hexa po pliku.

---

## 2. Typografia

Font: **Manrope** (global, `index.css`), body domyślnie `font-size: 18px`.

| Poziom | Klasy | Użycie |
|---|---|---|
| H1 — hero (homepage) | `text-5xl md:text-7xl font-black` | `Hero.tsx` |
| H1 — case study | `text-4xl md:text-6xl font-black text-[#0F172A] tracking-tight`, `style={{ lineHeight: 1.15 }}` | tytuł strony case study |
| H2 — sekcja | `text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]` | nagłówki s01–s05 |
| H3 — karta | `text-2xl font-bold text-[#0F172A]` | tytuł FeatureCard/StepCard |
| Body / opis | `text-slate-500 leading-relaxed` | opisy sekcji; w kartach `text-[15px]` |
| Quote | `font-light text-4xl md:text-5xl`, `style={{ lineHeight: 1.5 }}` | cytaty w s01 |
| Meta label | `text-slate-400` (przez `Tag`, bez `color` prop) | np. "Produkt", "Skala" |
| Meta value | `font-semibold text-slate-900 mt-1` | wartość pod meta labelem |

---

## 3. Spacing i radius

- **Zasada 40px w FeatureCard/StepCard**: `pt-10 px-10` na kontenerze (BEZ `pb-10` — dół celowo bez paddingu, żeby obrazek ucinał `overflow-hidden`), `mt-10` na obrazku (odstęp opis→obrazek). **Sztywna zasada — nigdy nie dodawaj `min-height` na bloku tytuł+opis** próbując wyrównać obrazki w parze kart o różnej długości opisu; to było testowane i jawnie odrzucone (psuje regułę 40px pod każdą kartą z osobna).
- Grid gap w sekcjach kart: `gap-6` (24px).
- Border-radius: `rounded-xl` (12px) — buttony, badge'e; `rounded-3xl` — duże boxy z obrazkiem (FeatureCard/StepCard/ImageCard); `rounded-[18px]` — StatCard; `rounded-lg` — callout box.
- Obrazy w boxach: `shadow-xl` **bez borderu** (nie `border border-slate-200`) — spójne z resztą wizualnych wrapperów.

---

## 4. UI primitives (shadcn, nadpisane globalnie)

- `button.tsx` — `rounded-xl`, `font-bold` (zmienione globalnie z domyślnego shadcn).
- `badge.tsx` — `rounded-xl` (zmienione globalnie z domyślnego shadcn).
- Jednorazowy override koloru na pojedynczej instancji (np. przyciemnienie jednego Badge) → dopisz nadpisującą klasę `className` (dzięki `tailwind-merge` w `cn()` wygrywa ostatnia), **nie zmieniaj globalnej CSS variable** (`--secondary` itd.) — ta jest współdzielona z Navbarem i innymi stronami.

---

## 5. Wzorce sekcji case study

### FeatureCard / StepCard (flat gray box, tytuł, opis, zrzut ekranu ucięty na dole)
Gotowy, ustabilizowany szablon — do zmiany treści podmieniaj WYŁĄCZNIE `title`/`desc`/`img`/`imgAlt`/`height`, nie ruszaj struktury komponentu.

```tsx
function FeatureCard({ title, desc, img, imgAlt, height = 420 }: { title: string; desc: ReactNode; img: string; imgAlt: string; height?: number }) {
  return (
    <div className="rounded-3xl overflow-hidden pt-10 px-10" style={{ height, backgroundColor: "#94A3B814" }}>
      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl mt-10" />
    </div>
  )
}
```
- `height` domyślnie `420` dla kart w parze (2 kolumny), `700` dla pojedynczej pełnoszerokościowej karty (`stack: true` bez `cards`) — to żywy, ręcznie strojony parametr, nie licz go z aspect ratio obrazka, po prostu zmień liczbę i zweryfikuj w przeglądarce.
- 1 element w `cards: [...]` → karta pełnej szerokości; 2 elementy → `grid grid-cols-1 md:grid-cols-2 gap-6`.
- `desc` typu `ReactNode` (nie `string`) — pozwala na JSX z `NumBadge` gdy trzeba odnieść się do konkretnych miejsc na zrzucie ekranu.
- Ten sam box jest też używany w gałęzi renderu bez `cards` (animowane wizualizacje: `SidebarSettingsSwap`, `AutoScrollImage`) — przy zmianie marginesów pamiętaj o OBU miejscach w pliku strony.

### ImageCard (box bez tekstu, samo zdjęcie)
```tsx
<div className="rounded-3xl overflow-hidden flex items-center justify-center" style={{ height, backgroundColor: "#94A3B814" }}>
  <img className="w-full h-full object-cover" style={{ objectPosition: "top" }} src={img} alt={imgAlt} />
</div>
```
Domyślnie `object-cover` z krojeniem od góry (nie `object-contain` na wyśrodkowanym tle) — punkt tekstowej karty-bez-tekstu to bleedowanie/krojenie jak każdy inny wizual w tym szablonie, nie pokazywanie całego zdjęcia na paddingu.

### Lessons / insights card grid
Karty insightów ("Kluczowe spostrzeżenia") i wniosków ("Czego się nauczyłam") używają IDENTYCZNEGO wzorca (nie numerowanej listy):
- Grid: `grid-cols-1 md:grid-cols-N` (N = liczba kart, żeby zmieściły się w jednym rzędzie).
- Karta: `border border-slate-200 rounded-xl p-6`.
- Ikona: lucide-react, **32px**, `color: PRIMARY` (akcent danego case study) — **dobierana pod treść konkretnej karty** (np. `Eye`/`MousePointerClick`/`Clock` dla insightów o zachowaniu użytkownika, `Search`/`Mail`/`Zap` dla wniosków), NIE jeden generyczny `Lightbulb`/`GraduationCap` dla wszystkich kart.
- Tytuł: `font-semibold text-slate-900 mt-3 mb-2` (bez override rozmiaru — domyślne 16px).
- Opis: `text-slate-500 leading-relaxed text-[15px]` — jedno zwarte zdanie, nie akapit. Nie powtarzaj liczby/statystyki już podanej gdzie indziej na stronie.

### Callout box (rola / pivot / warning)
```tsx
<div className="flex gap-3 items-start rounded-lg px-6 py-5" style={{ background: "#EEF2FF" }}>
  <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
  <p style={{ color: PRIMARY }}><strong className="font-semibold">{label}:</strong> {text}</p>
</div>
```

### StatCard / MetricsGrid
Kafelek statystyki z count-up animacją (`useCountUp`, cubic ease-out, 1400ms). Tło `color + bgAlpha` (`bgAlpha` domyślnie `"0D"`, dla szarych wariantów `"14"`). `rounded-[18px]`, hover `-translate-y-1`.

### Meta row (Produkt / Skala / Rola...)
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6">
  {meta.map(item => (
    <div className="flex flex-col"><Tag>{item.label}</Tag><p className="font-semibold text-slate-900 mt-1">{item.value}</p></div>
  ))}
</div>
```

### NdaImage (zrzut ekranu objęty NDA)
Wrapper na screenshot, którego nie wolno pokazać wprost: rysuje ikonę (`Frown`, lucide-react) i etykietę (`label`, np. "Under NDA"/"Objęte NDA") na środku obrazka. Props: `src`, `alt`, `label`, opcjonalnie `aspect` (CSS `aspect-ratio`), `crop` i `style`. Ramka to radius 16 + `var(--pf-hairline)`; plakietka stoi na płasko na 20% krycia w `--pf-text-muted`, w foncie display 24/37. Etykieta ma `aria-hidden` — kontekst NDA już niesie `alt`, więc nie dubluje się dla czytników ekranu.

`crop` (`{ left, top, width, height }`, wartości w procentach) jest dla obrazków, które projekt **ustawia ręcznie** zamiast dopasowywać do ramki — np. szeroki pasek wycięty z góry wysokiej mapy albo mały diagram wypuszczony na środek szerokiego pola. Bez `crop` obrazek po prostu pokrywa ramkę (`object-fit: cover`). Procenty bierz wprost z Figmy; skalują się responsywnie same.

**Ważne:** rozmycie musi być zapisane w samym pliku obrazka (eksport), NIE nałożone przez CSS `filter: blur()` — pliki w `public/` są serwowane publicznie, więc filtr CSS da się zdjąć jednym kliknięciem w devtools.

### Karta produktu (Codete)
Sekcja produktu to rząd `.pf-product-row`: numer w stałej kolumnie 180px (`.pf-product-label` + `.pf-overline`), 48px odstępu, a obok karta zajmująca resztę. Poniżej 1024px numer wskakuje nad kartę. Karta: `--pf-surface-card`, `var(--pf-hairline)`, radius 24, padding 32, `gap: 32` — kolejno znacznik 32×32 (radius 8, tło `--pf-accent-500`, ikona lucide 19px `strokeWidth 1.75` na biało), blok tytułu (h3 `.pf-h4` + chipy + intro), blok zakresu (h4 `.pf-h4` + `.pf-role-list`), rząd obrazków i podpis `.pf-caption` w `--pf-text-muted`.

Chipy w karcie to `Badge` bez wariantu, z `rounded-full border-0 bg-[var(--pf-primary-100)] px-3 py-1.5 text-base font-normal leading-6` — pełna pigułka na kolorze linii, o stopień ciemniejszym niż powierzchnia `secondary`. `border-0` trzyma wysokość na 36px, bo przezroczysta ramka `Badge` dodałaby dwa piksele.

`.pf-role-list` to **jedna** lista w dwóch szpaltach (`columns: 2`, `column-gap: 32px`, `break-inside: avoid`), nie dwie listy obok siebie: projekt dzieli ją wizualnie, ale czytnik ekranu ma usłyszeć jeden ciąg punktów. Poniżej 768px schodzi do jednej szpalty.

### NumBadge
Mały kolorowy krążek z cyfrą (`color: PRIMARY`, 20×20px, `inline-flex`) do odnoszenia się do elementów na zrzucie ekranu w tekście opisu, np. "① Filtrowanie... ② akcje zbiorcze...".

---

## 6. Animacje

Framer Motion (`motion/react` lub `framer-motion`) — wzorzec identyczny w każdym case study (`Reveal`, `StaggerGroup`/`StaggerItem`, `HeroStagger`). Krzywa łagodzenia odpowiada zaleceniu `impeccable:animate` (ease-out-expo).

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
```
- **Reveal** (pojedynczy element): `motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}`.
- **StaggerGroup + StaggerItem** (grupa elementów, np. karty w sekcji): rodzic dostaje `staggerParent` + `whileInView`/`viewport` jak wyżej, każde dziecko to `StaggerItem` z `variants={fadeUp}` (bez własnego `whileInView` — dziedziczy trigger z rodzica).
- **HeroStagger**: wariant dla contentu nad foldem, odpalany natychmiast (`initial="hidden" animate="show"`, nie `whileInView`) — **zawsze gated przez `useReducedMotion()`**: `initial={reduce ? false : "hidden"}`.
- **Count-up liczb** (`useCountUp`): `requestAnimationFrame`, cubic ease-out (`1 - (1-t)^3`), domyślny `duration = 1400ms`, startuje przez `IntersectionObserver` (`threshold: 0.2`, `disconnect()` po jednorazowym odpaleniu).
- **CSS keyframes** (`index.css`): `animate-nudge-ur` (strzałka ArrowUpRight), `animate-wave` (emoji 👋 w Hero), `animate-bounce` (Tailwind built-in, ArrowDown w Hero). `animate-grid-a/b/c` — nieużywane, do usunięcia jeśli nikt nie zaczął ich używać.
- Animacje specyficzne dla pojedynczej strony (ImageMarquee, CrossfadeImage, SidebarSettingsSwap, AutoScrollImage) mają swoje `@keyframes` lokalnie w inline `<style>` w danym pliku strony, NIE w `index.css` — bo są przywiązane do jednorazowych komponentów tej strony.
- **Nowy case study**: zawsze skopiuj `fadeUp`/`staggerParent`/`Reveal`/`StaggerGroup`/`StaggerItem`/`HeroStagger` z istniejącej strony (np. `RaportyCaseStudy.tsx`) zamiast wymyślać nowe wartości `duration`/`stagger`/`y` — spójność między case studies ma priorytet nad "ulepszeniem" pojedynczej strony.

---

## 7. Ikony

lucide-react. Rozmiar/kolor zależny od kontekstu:
- Insight/lessons card: **32px**, `color: PRIMARY` (patrz sekcja 5) — dobór pod treść, nie generyczna jedna ikona dla wszystkich kart.
- Meta/badge ikony (np. "Metody badawcze"): mniejsze, `14–16px`, kolor akcentu case study.
- ArrowDown/ArrowUpRight w CTA: `w-4 h-4` z animacją (`animate-bounce`/`animate-nudge-ur`).

---

## 8. Obrazy

- `object-cover` na całą ramkę gdy chcemy bleed/crop (domyślne dla ImageCard, FeatureCard screenshoty).
- `object-contain` na tle `#F5F5F5` gdy obraz ma inne proporcje niż ramka i NIE chcemy go kroić.
- **Pułapka**: hardkodowany `aspectRatio` na hero/cover `<img>` może niespodziewanie mocno przyciąć nowy obraz o innych proporcjach niż stary — wzór na % przyciętej wysokości: `1 - (containerH/imgH) / (containerW/imgW)`. Przy podmianie hero/cover image zawsze sprawdź, czy `<img>` ma wymuszony `aspectRatio` w stylu, i czy nowy obraz ma zbliżone proporcje.
- Workflow pozyskiwania/kompresji assetów (Second Brain → WebP) zostaje w [CLAUDE.md §8](../CLAUDE.md) — to proces, nie design token.

---

## 9. Czego nie robić

- Nie dodawaj `min-height` do bloku tytuł+opis żeby wyrównać obrazki w parze kart — złamie zasadę 40px (sekcja 3).
- Nie twórz nowego odcienia szarości ad-hoc dla kolejnego "flat box" — użyj `#94A3B814` (sekcja 1).
- Nie używaj jednej generycznej ikony (Lightbulb/GraduationCap) dla wszystkich kart insightów/wniosków — dobieraj pod treść (sekcja 5).
- Nie zmieniaj globalnej CSS variable (`--secondary` itd.) dla jednorazowego override koloru — nadpisz przez `className` na tej jednej instancji (sekcja 4).
- Nie wymyślaj nowych wartości `duration`/`ease`/`stagger` dla nowego case study — skopiuj `fadeUp`/`staggerParent` z istniejącej strony (sekcja 6).
- Nie używaj krzywych bounce/elastic (`cubic-bezier(0.34, 1.56, ...)`) — poza konwencją tego projektu.
