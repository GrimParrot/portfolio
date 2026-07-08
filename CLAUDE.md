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

**Alternatywa gdy PowerShell `-Command` gubi się na dłuższych/zagnieżdżonych zamianach** (błędy parsera przy cudzysłowach, myślnikach `—`, `„…"` w jednej linijce): użyj Node.js zamiast PowerShell — jest odporniejszy na cudzysłowy i nie ma problemu z kodowaniem skryptu wejściowego (PowerShell 5.1 czyta `.ps1` bez BOM w złym codepage'u i psuje polskie znaki w SAMYM skrypcie, nie tylko w pliku docelowym).

```js
// zapisz jako plik .js w scratchpad, potem: node plik.js
const fs = require('fs')
const path = 'G:/Claude Code/portfolio/src/copy/plik.tsx'
let text = fs.readFileSync(path, 'utf8')
text = text.replace('stary tekst', 'nowy tekst')
fs.writeFileSync(path, text, 'utf8') // fs.writeFileSync z 'utf8' NIE dodaje BOM
```

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

**Krytyczne:** `copy.pl` i `copy.en` muszą mieć identyczny kształt (te same pola we wszystkich sekcjach s01–s05), inaczej `tsc -b` wywali błąd dopiero na Vercelu (TS wnioskuje typ `t.sXX` jako unię pl/en i traci pola, których nie ma w drugim języku). Po każdej zmianie struktury w jednym języku — od razu powtórz ją w drugim. Zawsze odpalaj `npm run build` lokalnie przed pushem.

**Jeśli user pyta "gdzie jest ten tekst" i nie widzisz go na stronie:** sprawdź `grep -rn "<pole>" src/pages/` zanim odpowiesz — pole w `copy.tsx` mogło zostać dodane, ale nigdy nie podłączone do renderu (martwe copy). Tak było z `devWarningLabel`/`devWarningText` w Raporty — istniały w danych, ale żaden JSX ich nie czytał. W takiej sytuacji usuń pole z obu języków zamiast zostawiać je "na wszelki wypadek".

## 7. Powtarzalne wzorce sekcji case study (wypracowane w Raporty, używane też w Localo)

- **Karty insightów / lessons-learned:** grid `grid-cols-1 md:grid-cols-N` (N = liczba kart, żeby zmieściły się w jednym rzędzie), każda karta `border border-slate-200 rounded-xl p-6`, ikona z lucide-react 24px pomarańczowa (`#F97316`) nad tytułem (`font-semibold text-slate-900 mt-3 mb-2`), opis `text-slate-500 leading-relaxed text-[15px]` — jedno zwarte zdanie, nie akapit. Używane w "Kluczowe spostrzeżenia" i w sekcji wniosków (tam ikona `GraduationCap`).
- **Callout boxy (pivot/warning/goal):** jasne tło w kolorze akcentu (np. `#EEF2FF` dla niebieskiego), `rounded-lg px-6 py-5`, nagłówek pogrubiony + treść pod spodem (nie w jednej linii z myślnikiem, jeśli tekst długi).
- **Numerowane odznaki inline w tekście:** komponent `NumBadge` (mały niebieski krążek z cyfrą, `inline-flex`, 20×20px) do odnoszenia się do elementów na zrzucie ekranu obok, np. "(1) Filtrowanie... (2) akcje zbiorcze...".
- **Obrazki w layoutach dwukolumnowych:** albo `object-cover` na całą ramkę (`imgFit: "cover"` w danych kroku), albo `object-contain` wyśrodkowany na tle `#F5F5F5` gdy obraz ma inne proporcje niż ramka 16:9. Krok w `s04.steps` może mieć `stack: true` dla układu jednokolumnowego (tekst nad obrazkiem pełnej szerokości) zamiast domyślnego dwukolumnowego grid.
- **ImageCarousel** (`RaportyCaseStudy.tsx`) — zapętlona karuzela slajdów w stylu "jeden wyjeżdża w lewo, drugi wjeżdża z prawej". Kluczowa pułapka: transition CSS trzeba włączać TYLKO dla aktualnego i poprzedniego slajdu (`isCurrent || isPrev`), inaczej przy zmianie indeksu stary "nieaktywny" slajd przeleci przez cały ekran zamiast czekać bez animacji.
- **SidebarSettingsSwap** — animacja, w której zmienia się tylko fragment zrzutu ekranu (np. boczne menu) przez nakładkowy `<img>` z absolutnym pozycjonowaniem w % i opacity fade. Współrzędne (`top/left/width/height` w %) trzeba przeliczać względem PRZYCIĘTEJ wysokości kontenera (jeśli `aspectRatio` kontenera jest inne niż natywne proporcje obrazka bazowego), nie względem pełnej wysokości oryginalnego pliku.
- **AutoScrollImage** — bardzo wysoki obrazek (np. cały scrollowany raport) automatycznie przewija się w dół i wraca na górę w pętli przez `@keyframes` na `translateY()`. Wzór: `scrollPct = (1 - imageAspect/containerAspect) * 100`, gdzie `imageAspect = width/height`. Łatwo pomylić kolejność dzielenia — zawsze weryfikuj wizualnie w przeglądarce po zmianie.
- **imgPair (dwa obrazki obok siebie pod wspólnym tytułem)** — gdy user prosi o scalenie dwóch sąsiednich kroków `s04.steps` w jedną sekcję z jednym tytułem/opisem i dwoma zdjęciami w 2 kolumnach: jeden step ze `stack: true` i polem `imgPair: [{ img, imgAlt, imgFit? }, { img, imgAlt, imgFit? }]` zamiast `img`/`imgAlt`. W renderze grid `grid-cols-1 md:grid-cols-2 gap-6`, każdy element albo `object-cover` (gdy `imgFit: "cover"`) albo `object-contain` na tle `#F5F5F5` (domyślnie). **Pułapka TS:** jeśli usuniesz WSZYSTKIE top-level `imgFit` z pozostałych (nie-imgPair) kroków, `tsc -b` przestanie widzieć tę właściwość w unii typów i wywali błąd na starym renderze dwukolumnowym — zabezpiecz dostęp przez `"imgFit" in feature && feature.imgFit === "cover"` zamiast `feature.imgFit === "cover"`.
- **FeatureCard (dwie karty osobno tytułowane, zrzut ekranu "wjeżdżający" pod tekstem, przycięty na dole)** — komponent w `RaportyCaseStudy.tsx`, użyty gdy user pokazuje inspirację typu "duotone card z eyebrow + bold heading + opis, a pod spodem zrzut ekranu nakładający się i ucięty na krawędzi karty". Dane: step ze `stack: true` i polem `cards: [{ eyebrow, title, desc, img, imgAlt }, { ... }]` (2 elementy) zamiast `title`/`desc`/`img` na poziomie stepu. Render: `feature.cards ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">{feature.cards.map(c => <FeatureCard key={j} {...c} />)}</div> : feature.stack ? ... : ...` (branch PRZED `feature.stack`, bo cards-step nie ma top-level title/desc).
  - Struktura `FeatureCard`: outer `<div className="relative rounded-3xl overflow-hidden" style={{ height: 420, backgroundColor: "#94A3B80D" }}>` (NIE flex — patrz pułapka niżej), środek: zwykły `<div className="pt-8 px-8">` z eyebrow/title/desc w normalnym flow, a obrazek jako **osobny** `<img className="absolute left-1/2 rounded-t-2xl shadow-xl" style={{ width: "92%", top: 180, transform: "translateX(-50%)" }} />` bezpośrednio w outer divie (nie zagnieżdżony w dodatkowy flex-wrapper).
  - Tło karty musi być IDENTYCZNE z szarym z `StatCard`/`MetricsGrid3` dla spójności: `backgroundColor: "#94A3B80D"` (czyli `#94A3B8` + hex-alpha `0D` ≈ 5% opacity) — nie `bg-slate-100` ani inny osobny odcień.
  - **Pułapka #1 (flex + różne aspect ratio obrazków):** NIE używaj `flex flex-col` na outer + `flex-1` na wrapperze obrazka. Gdy dwa obrazki w parze mają różne proporcje (np. 600×542 vs 600×380), flex-box potrafi (w połączeniu z fixed `height` + `overflow-hidden`) przesunąć tekst JEDNEJ z kart o dziesiątki pikseli względem drugiej — layout wygląda identycznie w kodzie, ale renderuje się inaczej per-karta. Rozwiązanie: zrezygnuj z flex, pozycjonuj obrazek `position: absolute` z FIXED `top` w px względem outer diva (nie flex-1 z automatycznym rozmiarem) — wtedy oba obrazki zaczynają się w tym samym miejscu niezależnie od proporcji, a różnica w wysokości objawia się tylko jako różna ilość "ucięcia" na dole (co jest pożądane, nie bug).
  - **Pułapka #2 (weryfikacja w przeglądarce):** strona ma globalnie `scroll-behavior: smooth` (CSS). `scrollIntoView(...)` bez opcji ANIMUJE scroll przez klika klatek PO zakończeniu wywołania JS — jeśli zaraz potem zrobisz screenshot lub `getBoundingClientRect()`, złapiesz stronę W TRAKCIE przewijania i dostaniesz pozornie losowe/sprzeczne wyniki (wygląda jak realny bug layoutu, ale nim nie jest). Zawsze scrolluj przez `el.scrollIntoView({ behavior: "instant", block: "..." })` (i `window.scrollBy({ top, behavior: "instant" })`), inaczej zmarnujesz dużo czasu ścigając urojony bug.

## 8. Assety graficzne — Second Brain → kompresja WebP

Obrazki do case studies użytkowniczka wrzuca do Second Brain (`C:\Users\supru\Documents\super-brain Brajan\3-Projects\portfolio\materials\<Projekt>\`), nie bezpośrednio do repo. Workflow:

1. Sprawdź folder materiałów projektu (`ls`) i porównaj `timestamp` plików — jeśli user mówi "podmień/dodaj obrazek", zwykle chodzi o najnowszy plik w tym folderze.
2. Skopiuj do `public/` pod nazwą `[projekt]-[opis].png` (np. `raporty-lista.png`).
3. **Przed pushem skompresuj do WebP** — PNG ze zrzutów ekranu bywają duże (100–800 KB), WebP daje ~75–85% redukcji bez zauważalnej straty jakości dla UI screenshotów. `ffmpeg` jest zainstalowany przez winget (`Gyan.FFmpeg`) — jeśli `ffmpeg` nie jest w PATH nowej sesji PowerShell, znajdź go: `Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Filter ffmpeg.exe -Recurse`.
   ```powershell
   & $ffmpeg -y -i wejscie.png -vf "scale=min(1000\,iw):-1" -quality 82 wyjscie.webp
   ```
4. Zaktualizuj wszystkie odwołania `.png` → `.webp` w `src/copy/[projekt].copy.tsx` i `src/pages/[Nazwa]CaseStudy.tsx` (i `src/data/projects.ts` jeśli to cover), usuń stare `.png` z `public/`.
5. `npm run build` żeby upewnić się, że nic się nie wysypało, potem screenshot w preview.

## 8b. CV — wersje językowe

Plik CV jest rozdzielony na dwa: `public/cv-pl.pdf` i `public/cv-en.pdf` (nie ma już jednego uniwersalnego `cv.pdf`). Każde miejsce linkujące do CV (`Navbar.tsx` desktop + mobile, `Hero.tsx`, `Contact.tsx`) musi wybierać plik dynamicznie na podstawie `useLang()`:

```tsx
const { lang } = useLang()
// ...
<a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">
```

Gdy user mówi "zaktualizowałam CV, podmień" — sprawdź `materials/` w Second Brain (patrz punkt 8) pod kątem PLIKÓW z "CV" w nazwie z najnowszym `timestamp`; jeśli są dwa (PL/ENG), skopiuj oba do `public/cv-pl.pdf` / `public/cv-en.pdf` i usuń stary `cv.pdf`, jeśli istnieje.

## 9. Animacje CSS (index.css)

Zdefiniowane keyframes:
- `animate-nudge-ur` — strzałka ArrowUpRight (LinkedIn, Contact)
- `animate-wave` — emoji 👋 w Hero
- `animate-bounce` — ArrowDown w Hero (Tailwind built-in)
- `animate-grid-a/b/c` — nieużywane (zostawione, można usunąć)

Animacje specyficzne dla Raporty (ImageCarousel, SidebarSettingsSwap, AutoScrollImage) są zdefiniowane lokalnie w `RaportyCaseStudy.tsx` przez `@keyframes` w inline `<style>` — nie w `index.css`, bo są przywiązane do konkretnych, jednorazowych komponentów tej strony.

## 10. Workflow po zmianach UI

Po edycji komponentu widocznego w przeglądarce:
1. Odśwież przez `preview_eval: window.location.reload()`
2. Sprawdź `preview_console_logs` pod kątem błędów
3. Zrób screenshot lub inspect dla potwierdzenia

**Uwaga na stare błędy w konsoli:** Vite HMR czasem zostawia w logu nieaktualne wpisy z poprzednich wersji modułu (np. `ReferenceError` po edycji, który już nie występuje). Jeśli błąd wygląda na nieaktualny, zweryfikuj bezpośrednio w DOM (`document.querySelectorAll` / `innerText.includes(...)`) zamiast ufać samemu logowi — realny stan strony jest wiarygodniejszy niż zbuforowana konsola.

**Uwaga na `serverId` z preview_start:** jeśli sesja trwa długo i dev server został zrestartowany, stary `serverId` może zwracać nieprzewidywalne wyniki (np. nawigacja, która "nie działa"). Jeśli nawigacja/zachowanie strony wygląda losowo mimo poprawnego kodu, sprawdź `preview_list` i użyj aktualnego `serverId`.

**Uwaga na klikanie PL/EN i innych przycisków przez `preview_eval` z natywnym `.click()`:** czasem stan Reacta nie zdąży się zaktualizować przed odczytem wyniku w tym samym wywołaniu (React batchuje update). Jeśli po kliknięciu odczyt od razu pokazuje stary stan, klikaj przez `preview_click` z precyzyjnym selektorem (np. `nav button:nth-of-type(2)`) ALBO owiń odczyt w `setTimeout(..., 200)` w `preview_eval`, żeby dać Reactowi czas na re-render przed sprawdzeniem DOM.

**Navbar — przycisk Kontakt:** scrolluje bezpośrednio do `#contact` na KAŻDEJ stronie (nie nawiguje do `/`), bo `<Contact id="contact">` jest renderowany na każdej stronie (homepage + wszystkie case studies, patrz `src/App.tsx` i `src/pages/*.tsx`). Inaczej jest z przyciskiem "Projekty" — sekcja `#projects` istnieje TYLKO na homepage, więc tam nawigacja do `/` + scroll pozostaje potrzebna.

## 11. Git

Branch: `master`. Push bezpośrednio — brak CI/CD pipeline wymagającego PR, ale **Vercel odpala pełny `tsc -b` przy deployu** — zawsze rób `npm run build` lokalnie przed pushem, żeby złapać błędy typów (patrz punkt 6 o spójności PL/EN).
