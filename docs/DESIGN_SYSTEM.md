# Design System — Portfolio Edyta

Źródło prawdy dla kolorów, typografii, spacingu, komponentów UI, wzorców sekcji case study i animacji. **Przy tworzeniu nowego elementu zawsze sprawdź najpierw tutaj**, zamiast wymyślać nowy odcień/spacing/wzorzec od zera.

Ten plik zastępuje dawne sekcje 4 i 7 [CLAUDE.md](../CLAUDE.md) — reszta CLAUDE.md (architektura, i18n, workflow assetów, git) zostaje bez zmian.

---

## 1. Kolory

### Globalne
| Token | Wartość | Użycie |
|-------|---------|--------|
| Primary (ciemny) | `#0F172A` | nagłówki, tło primary buttona |
| Hover ciemny | `#1E293B` | hover primary buttona |
| Akcent zielony (global, portfolio) | `#0ABA53` | wspólny akcent poza case studies (nie mylić z akcentami per-projekt poniżej) |
| Meta labels | `text-slate-400` | Tag bez `color` prop |
| Opisy | `text-slate-500` | `leading-relaxed`, w kartach `text-[15px]` |
| Nagłówki/wartości | `text-slate-900` / `#0F172A` | |

### Standardowy szary "flat box"
`#94A3B814` (`#94A3B8` + hex-alpha `14` ≈ 8% opacity) — jedyny dozwolony gray box background w case studies (FeatureCard/StepCard, ImageCard, szare kafelki StatCard/MetricsGrid, tło pigułek "Metody badawcze"). **Przy zmianie tego odcienia zawsze `grep -rn "94A3B8" src/`** i zaktualizuj wszystkie trafienia naraz.

Wyjątek: kolorowy/akcentowy kafelek StatCard zostaje na `color + "0D"` (~5% opacity) — nie na `14`. `StatCard` ma prop `bgAlpha` (domyślnie `"0D"`) właśnie do tego rozróżnienia: szary wariant dostaje `bgAlpha="14"`, kolorowy zostaje domyślny.

### Callout box (rola/pivot/warning)
Tło `#EEF2FF`, tekst w kolorze PRIMARY danego case study, `rounded-lg px-6 py-5`.

### Akcent per case study (aktualny stan w kodzie — sprawdzone `grep`, nie ufaj starym notatkom)
| Case study | Const | Wartość |
|---|---|---|
| Localo (Client Acquisition) | `PRIMARY` | `#466AFA` |
| Localo V2 | `ACCENT` / `ACCENT_DEEP` / `ACCENT_SOFT` | `#466AFA` / `#1E2E8C` / `#8FA6FF` |
| Raporty | `PRIMARY` | `#466AFA` (ten sam niebieski co Localo) — `#6366F1` to TYLKO kolor ikon w jednym badge'u "Metody badawcze", nie główny akcent |
| Naturalnie | `PRIMARY` | `#32685B` |
| Kafejeto | `PRIMARY` | `#8EBD3F` |
| Banneroza | `PRIMARY` | `#DD8100` — karta na homepage (`data/projects.ts`) używa INNEGO gradientu `#FEC400 → #d4a300`, celowo różnego od in-page accent |

**Przy dodawaniu nowego case study:** zdefiniuj `const PRIMARY = "#hex"` na górze pliku strony i użyj go we wszystkich akcentowanych elementach (callout, ikony insight/lessons, ewentualny gradient) zamiast wpisywać hex bezpośrednio w wielu miejscach.

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
