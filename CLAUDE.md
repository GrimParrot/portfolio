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

## 7. Powtarzalne wzorce sekcji case study (wypracowane w Raporty, używane też w Localo)

- **Karty insightów / lessons-learned:** grid `grid-cols-1 md:grid-cols-N` (N = liczba kart, żeby zmieściły się w jednym rzędzie), każda karta `border border-slate-200 rounded-xl p-6`, ikona z lucide-react 24px pomarańczowa (`#F97316`) nad tytułem (`font-semibold text-slate-900 mt-3 mb-2`), opis `text-slate-500 leading-relaxed text-[15px]` — jedno zwarte zdanie, nie akapit. Używane w "Kluczowe spostrzeżenia" i w sekcji wniosków (tam ikona `GraduationCap`).
- **Callout boxy (pivot/warning/goal):** jasne tło w kolorze akcentu (np. `#EEF2FF` dla niebieskiego), `rounded-lg px-6 py-5`, nagłówek pogrubiony + treść pod spodem (nie w jednej linii z myślnikiem, jeśli tekst długi).
- **Numerowane odznaki inline w tekście:** komponent `NumBadge` (mały niebieski krążek z cyfrą, `inline-flex`, 20×20px) do odnoszenia się do elementów na zrzucie ekranu obok, np. "(1) Filtrowanie... (2) akcje zbiorcze...".
- **Obrazki w layoutach dwukolumnowych:** albo `object-cover` na całą ramkę (`imgFit: "cover"` w danych kroku), albo `object-contain` wyśrodkowany na tle `#F5F5F5` gdy obraz ma inne proporcje niż ramka 16:9. Krok w `s04.steps` może mieć `stack: true` dla układu jednokolumnowego (tekst nad obrazkiem pełnej szerokości) zamiast domyślnego dwukolumnowego grid.
- **ImageCarousel** (`RaportyCaseStudy.tsx`) — zapętlona karuzela slajdów w stylu "jeden wyjeżdża w lewo, drugi wjeżdża z prawej". Kluczowa pułapka: transition CSS trzeba włączać TYLKO dla aktualnego i poprzedniego slajdu (`isCurrent || isPrev`), inaczej przy zmianie indeksu stary "nieaktywny" slajd przeleci przez cały ekran zamiast czekać bez animacji.
- **SidebarSettingsSwap** — animacja, w której zmienia się tylko fragment zrzutu ekranu (np. boczne menu) przez nakładkowy `<img>` z absolutnym pozycjonowaniem w % i opacity fade. Współrzędne (`top/left/width/height` w %) trzeba przeliczać względem PRZYCIĘTEJ wysokości kontenera (jeśli `aspectRatio` kontenera jest inne niż natywne proporcje obrazka bazowego), nie względem pełnej wysokości oryginalnego pliku.
- **AutoScrollImage** — bardzo wysoki obrazek (np. cały scrollowany raport) automatycznie przewija się w dół i wraca na górę w pętli przez `@keyframes` na `translateY()`. Wzór: `scrollPct = (1 - imageAspect/containerAspect) * 100`, gdzie `imageAspect = width/height`. Łatwo pomylić kolejność dzielenia — zawsze weryfikuj wizualnie w przeglądarce po zmianie.

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

## 11. Git

Branch: `master`. Push bezpośrednio — brak CI/CD pipeline wymagającego PR, ale **Vercel odpala pełny `tsc -b` przy deployu** — zawsze rób `npm run build` lokalnie przed pushem, żeby złapać błędy typów (patrz punkt 6 o spójności PL/EN).
