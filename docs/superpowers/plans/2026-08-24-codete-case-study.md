# Case study Codete — plan implementacji

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać do portfolio case study „Dwa lata, cztery produkty" pod adresem `/case-study/codete`, z materiałami wizualnymi zasłoniętymi ze względu na NDA.

**Architecture:** Jedna strona w pionowym scrollu, 1:1 z Figmą: sekcja intro plus cztery bloki produktowe o identycznym rytmie. Strona otwiera się jako modal nad stroną główną — tak działa każdy projekt w tym portfolio. Zbudowana z istniejących komponentów `raporty-ds`; jedynym nowym elementem jest `NdaImage`, który nakłada plakietkę „Under NDA" na rozmyty zrzut.

**Tech Stack:** React 19 · Vite · TypeScript · Tailwind · motion/react · React Router · lucide-react

## Global Constraints

- **Polskie znaki:** zweryfikowane w tej sesji — narzędzie Write zapisuje czyste UTF-8 bez BOM, razem z ą ę ó ś ź ż ć ń ł, apostrofami i myślnikami. Używaj Write, a po zapisie potwierdź `file <plik>` (oczekiwane „UTF-8 text", bez „with BOM"). **Nie przepuszczaj polskiego tekstu przez heredoc w Bashu** — pojedynczy apostrof (`pipeline'ami`, `don't`) rozwala cytowanie polecenia; to realnie wywróciło pisanie tego planu dwa razy. Alternatywy przy problemach: PowerShell UTF-8 no-BOM albo Node.js z `fs.writeFileSync(path, text, "utf8")`.
- **Kształt PL/EN:** `copy.pl` i `copy.en` muszą mieć identyczne pola we wszystkich sekcjach. Rozjazd przechodzi lokalnie, a wywala `tsc -b` dopiero na Vercelu.
- **Brak testów jednostkowych:** projekt nie ma runnera. Weryfikacja to `npm run build` (pełny `tsc -b`) plus przegląd w preview. Każde zadanie kończy się buildem.
- **NDA:** żaden ostry oryginał z Second Brain nie może trafić do `public/` ani do repo. Rozmycie musi pochodzić z eksportu Figmy, wypalone w pikselach.
- **Git:** branch `master`, commit po każdym zadaniu. Nie robić `git push` — tylko na wyraźną prośbę użytkowniczki.
- **Źródło projektu:** Figma `Realizajce`, frame „Reports", node `558:93167`.

---

### Task 1: Komponent `NdaImage`

**Files:**
- Create: `src/components/raporty-ds/content/NdaImage.tsx`
- Modify: `src/components/raporty-ds/index.ts`

**Interfaces:**
- Consumes: nic
- Produces: `NdaImage({ src, alt, label, aspect }: { src: string; alt: string; label: string; aspect?: string })` — eksportowany z `@/components/raporty-ds`

**Dlaczego to komponent, a nie wypalona plakietka w obrazku:** rzędy mają po 2–4 obrazki. Gdyby cały rząd był jednym eksportem, nie zwinąłby się na szerokości telefonu. Rozmycie zostaje w pikselach (NDA), plakietka wraca do kodu (responsywność, tłumaczenie).

- [ ] **Step 1: Utwórz komponent**

Plik nie zawiera polskich znaków, więc Write jest tutaj dozwolony.

```tsx
import { Frown } from "lucide-react"

/** A screenshot we may not show. The blur is baked into the exported file —
 *  a CSS filter would come off with one click in devtools, and the file in
 *  public/ is public. Only the badge is drawn here, so a row of these still
 *  reflows on a phone instead of being one wide baked-in image.
 *
 *  `label` comes from copy rather than being hardcoded: the badge is the one
 *  piece of text sitting on top of the artwork, and it translates with the
 *  rest of the page. */
export function NdaImage({
  src,
  alt,
  label,
  aspect,
}: {
  src: string
  alt: string
  label: string
  aspect?: string
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 12,
        overflow: "hidden",
        background: "#F5F5F5",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Frown size={49} strokeWidth={1.5} color="#E3E3E3" aria-hidden />
        <span
          style={{
            fontFamily: "var(--pf-font-body)",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "26px",
            color: "#E3E3E3",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Dopisz eksport**

W `src/components/raporty-ds/index.ts`, w bloku `content`, po linii z `StatCard`:

```ts
export { NdaImage } from "./content/NdaImage"
```

- [ ] **Step 3: Zweryfikuj build**

Run: `npm run build`
Expected: PASS, bez błędów TypeScript.

- [ ] **Step 4: Commit**

```bash
git add src/components/raporty-ds/content/NdaImage.tsx src/components/raporty-ds/index.ts
git commit -m "Show an NDA screenshot without handing over the screenshot"
```

---

### Task 2: Assety — eksport z Figmy do WebP

**Files:**
- Create: `public/codete-cover.webp` plus po kilka `public/codete-[blok]-[opis].webp` na blok

**Interfaces:**
- Consumes: nic
- Produces: ścieżki `/codete-*.webp`, używane przez Task 3 i Task 5

**Warunek wstępny:** w aplikacji Figma desktop plik `Realizajce` musi być **aktywną zakładką**, inaczej narzędzia MCP zwracają „No node could be found". To realnie się zdarzyło przy pisaniu tego planu.

- [ ] **Step 1: Pobierz URL-e assetów**

Wywołaj `get_design_context` kolejno na blokach:

| Blok | node |
|---|---|
| intro plus cover | `558:100107` |
| 01 Management platform | `558:108224` |
| 02 Data reconciliation | `558:148900` |
| 03 Dev tools | `560:166739` |
| 04 Data analytics | `560:179494` |

Zwrócone URL-e wskazują na lokalny serwer Figmy (`http://localhost:3845/assets/...`).

**Uwaga:** przed pierwszym wywołaniem `get_design_context` trzeba wczytać skill `figma:figma-design-to-code` — tak wymaga opis narzędzia.

- [ ] **Step 2: Pobierz pliki**

```bash
curl -o "public/codete-01-dashboard.png" "http://localhost:3845/assets/HASH.png"
```

Nazewnictwo: `codete-[numer bloku]-[krotki-opis].png`. Okładka to `codete-cover.png`.

Rozmyte prostokąty do pobrania, wg nazw warstw w Figmie:

- blok 01: `Log in 1`, `Frame-1 1`, `Frame-2 1`, `Frame 1597880479`, `Logo 1`, `Typography 1` oraz duży zrzut z kolumny „Moja rola" (`Frame 1597880493`)
- blok 02: `Frame 1597880481`, `Product logic 1`, `User interviews [2023] 1`, `Frame-1 2`, `4 5`, `Frame-2 2`
- blok 03: `Frame 1597880487`, `architecture 1`, `Frame-2 3`, `Frame-1 3`
- blok 04: `Relation 1`, `Group 1160446228 1`, `New plugin_2 1`, `Dashboard_LM_Full menu 1`, `Pipelines_v2 2`

- [ ] **Step 3: Sprawdź, że rozmycie jest w pikselach**

Otwórz jeden pobrany PNG i potwierdź, że zrzut jest rozmyty w samym pliku. Jeśli którykolwiek plik wyszedł ostry, **przerwij** — eksport nie złapał efektu blur, a wrzucenie takiego pliku do repo złamałoby NDA.

- [ ] **Step 4: Skompresuj do WebP**

`ffmpeg` jest zainstalowany przez winget. Jeśli nie ma go w PATH:
`Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Filter ffmpeg.exe -Recurse`

```powershell
& $ffmpeg -y -i public\codete-01-dashboard.png -vf "scale=min(1000\,iw):-1" -quality 82 public\codete-01-dashboard.webp
```

Powtórz dla każdego pliku, potem usuń wszystkie `public/codete-*.png`.

- [ ] **Step 5: Potwierdź, że nie ma ostrych oryginałów**

Run: `ls public/codete-*`
Expected: same `.webp`, zero `.png`.

- [ ] **Step 6: Commit**

```bash
git add public/codete-*.webp
git commit -m "Bring in the Codete screenshots with the blur already in them"
```

---

### Task 3: Plik copy PL/EN

**Files:**
- Create: `src/copy/codete.copy.tsx`

**Interfaces:**
- Consumes: ścieżki `/codete-*.webp` z Task 2
- Produces: `copy` — obiekt `{ pl: CodeteCopy, en: CodeteCopy }` oraz `export type Product`, importowane przez `CodeteCaseStudy.tsx`

**Plik zawiera polskie znaki.** Zweryfikowane w tej sesji: narzędzie Write zapisuje czyste UTF-8 bez BOM, razem z apostrofami i myślnikami, więc jest tutaj bezpieczne. Po zapisie potwierdź `file src/copy/codete.copy.tsx` — oczekiwane „UTF-8 text", bez „with BOM".

- [ ] **Step 1: Dociągnij brakujące teksty z Figmy**

**Odczytane z Figmy — nie trzeba już nic dociągać.** Etykiety tagów, komplet:

- blok 01: `Enterprise`, `Internal Tools`, `Information Architecture`, `Heavy Data`, `Dashboard`
- blok 02: `B2B`, `0→1`, `Contract Management`, `Data Reconciliation`, `Design System`, `Dashboard`
- blok 03: `DevTools`, `B2B`, `0→1`, `Deployments & Releases`, `Design System`
- blok 04: `Data Analytics`, `Heavy Data`, `Data Lake`, `0→1`, `MVP`

Strzałka w `0→1` to znak `→` (U+2192), nie `->`.

**Ważne, czego pierwsza wersja planu nie ujmowała:** pozycje list „Moja rola" mają **pogrubienia w środku zdania** (np. „nowa **architektura informacji**"). Dlatego `role` jest typu `React.ReactNode[]`, a nie `string[]`. Pogrubienia zaznaczone niżej gwiazdkami odwzorowuj jako `<strong>` w JSX — dokładnie te frazy, nie inne.

- [ ] **Step 2: Zbuduj strukturę pliku**

Kształt, którego trzyma się cała reszta planu:

```tsx
export type Product = {
  eyebrow: string
  title: string
  tags: string[]
  intro: string
  roleHeading: string
  role: React.ReactNode[]
  stats?: { value: string; label: string }[]
  challengeHeading: string
  challenge: string
  quote?: string
  solutionHeading: string
  solution: string
  heroImage: { src: string; alt: string; aspect?: string }
  imagesAfterChallenge: { src: string; alt: string; aspect?: string }[]
  imagesAfterSolution: { src: string; alt: string; aspect?: string }[]
}

type CodeteCopy = {
  chapters: Record<"intro" | "management" | "reconciliation" | "devtools" | "analytics", string>
  heroEyebrow: string
  heroTitle: string
  heroLead: React.ReactNode
  ndaNote: React.ReactNode
  metaBar: { label: string; value: string }[]
  coverAlt: string
  ndaLabel: string
  products: Product[]
}

export const copy: { pl: CodeteCopy; en: CodeteCopy } = { pl: {}, en: {} }
```

`stats` wypełnione tylko w produkcie 01, `quote` tylko w produkcie 02 — w pozostałych pomijane. Pola opcjonalne muszą być pominięte w obu językach tak samo, inaczej TS zgubi je w unii `pl | en`.

Sprawdź w `src/components/raporty-ds/meta/MetaBar.tsx`, jakiego kształtu wpisów oczekuje `items`, i dopasuj `metaBar` do niego zamiast zgadywać nazwy pól.

- [ ] **Step 3: Wpisz teksty PL — intro**

- `heroEyebrow`: `PROJECTS · CODETE`
- `heroTitle`: `Dwa lata, cztery produkty`
- `heroLead`: „Podczas mojej **2-letniej pracy w Codete** zaprojektowałam cztery **złożone produkty B2B**, każdy w innej domenie: wewnętrzna platforma enterprise dla operatora telekomunikacyjnego, narzędzie do umów i uzgadniania danych, narzędzie dla deweloperów i platforma danych w MVP. Trzy z nich wymagały stworzenia **design systemu od zera**, razem z logo i brandem. Przy każdym pracowałam **end-to-end**: architektura informacji, flow, UI, dokumentacja i handoff dla zespołów deweloperskich."
- `ndaNote`: „Ze względu na **NDA nie mogę upublicznić wszystkich informacji i materiałów. Chętnie opowiem więcej na spotkaniu.**"
- `metaBar`: `MOJA ROLA / Senior UX/UI Designer`, `PRODUKTY / 4`, `SKALA / 0→1 i redesign`, `DESIGN SYSTEMY / 3`
- `ndaLabel`: `Under NDA`
- `chapters`: `Intro`, `Management platform`, `Data reconciliation`, `Dev tools`, `Data analytics`

Pogrubienia w `heroLead` i `ndaNote` odwzorowują Figmę — dlatego te dwa pola są `React.ReactNode`, nie `string`.

Nagłówki powtarzalne w każdym produkcie: `roleHeading` = „Moja rola", `challengeHeading` = „Wyzwanie", `solutionHeading` = „Rozwiązanie".

- [ ] **Step 4: Wpisz teksty PL — produkt 01**

`eyebrow`: `01 · Management platform`, `title`: „Redesign platformy do zarządzania"

`intro`: „To narzędzie wewnętrzne dużego międzynarodowego operatora telekomunikacyjnego: firmy współpracujące, klienci i partnerzy razem z informacjami o nich i przypisanymi tokenami, użytkownicy z dostępami i stanowiskami. Do tego całe portfolio produktów, zamówienia, zarządzanie API i faktury. Korzystało z niego kilkaset osób."

`tags`: `Enterprise`, `Internal Tools`, `Information Architecture`, `Heavy Data`, `Dashboard`

`role` (dziewięć pozycji, pogrubienia dokładnie tam gdzie gwiazdki):

- nowe logo i brand guide
- nowa **architektura informacji**
- wyodrębnione persony
- flow dla każdej persony
- system logowania z uwierzytelnianiem dwuskładnikowym
- **design system od zera**, atomy, patterny, komponenty
- dokumentacja, prototypy i **handoff** dla dwóch zespołów deweloperskich
- po redesignie rozwijałam platformę dalej, razem z innymi projektantami
- dark/light mode

`stats`: `8` — „ról w rdzeniu systemu"; `100+` — „zaprojektowanych ekranów"; `4` — „główne typy zamówień z własną ścieżką"

`challenge`: „Aplikacja urosła bez planu. Nieużywane moduły, ścieżki, które nie łączyły się w spójne flow, wolne działanie. Osiem obszarów funkcjonalnych, trzy grupy użytkowników o rozłącznych potrzebach i jeden interfejs, który nie umiał żadnej z nich zaprowadzić tam, gdzie faktycznie pracuje. Do tego domena, której musiałam się nauczyć od zera: porty, maszyny wirtualne, API gateway."

`solution`: „Funkcje pogrupowane wokół ścieżek person. Menu w dwóch wariantach, Business i Development, przełączanych switchem. Dashboard z domyślnym układem pod rolę. Nawigacja oparta na ośmiu rolach rdzeniowych. Martwy moduł wycięty po sprawdzeniu w danych."

- [ ] **Step 5: Wpisz teksty PL — produkt 02**

`eyebrow`: `02 · DATA RECONCILIATION`, `title`: „Platforma do negocjacji"

`intro`: „Narzędzie, w którym firmy zawierają ze sobą umowy i sprawdzają dane, które tym umowom podlegają. Zaprojektowałam cały produkt: mapowanie pól między systemami, które to porównanie robi za użytkownika, moduł negocjacji rozbieżności, logo, brand i design system od zera. 25+ widoków"

`tags`: `B2B`, `0→1`, `Contract Management`, `Data Reconciliation`, `Design System`, `Dashboard`

`role` (osiem pozycji):

- nowe logo i identyfikacja wizualna
- flow całego produktu
- **architektura informacji**
- UI, **prototyp**
- mapowanie pól między systemami, które zastąpiło ręczną weryfikację przesyłu
- moduł negocjacji rozbieżności
- **dashboard umów** i proces zawierania nowej umowy
- **design system od zera**

`challenge`: „Trzy rzeczy, które musiały zmieścić się w jednym produkcie: zawarcie umowy, automatyczne porównanie danych mimo dwóch różnych nazewnictw i sposób na negocjacje, kiedy porównanie pokaże rozbieżność. Skomplikowany interfejs, bo produkt obsługuje dwie firmy naraz, ich dwa systemy i umowę, która to spina. Mnóstwo danych porównawczych, całe pliki pól przy polach. Do tego wymagający użytkownicy: managerowie i stakeholderzy, którzy oceniają produkt od pierwszego spojrzenia. Wywiady po pierwszej wersji pokazały, gdzie to boli:"

`quote`: „Reconciliation process is not clear enough. Users don't know where they should start, what they supposed to do and how they can resolve mismatches"

`solution`: „Użytkownik raz mapuje pola systemu (nazewnictwo, rodzaj, jednostki), od tego momentu narzędzie porównuje pliki samo. Rozbieżność otwiera negocjację: kontrpropozycja, spotkanie w połowie. Do tego dashboard wszystkich umów i proces zawierania nowej. 25+ widoków w pół roku, w hi-fi i klikalnych prototypach od pierwszego dnia. Efekt prezentowałam inwestorowi, projekt przeszedł do kolejnej rundy finansowania."

- [ ] **Step 6: Wpisz teksty PL — produkt 03**

`eyebrow`: `03 · DEV TOOLS`, `title`: „Narzędzie dla deweloperów"

`intro`: „Prowadziłam trzyosobowy zespół projektantów, ze mną włącznie. Zbudowaliśmy narzędzie dla deweloperów do nadzoru nad aplikacjami, pipeline'ami, środowiskami, deploymentami i release'ami."

`tags`: `DevTools`, `B2B`, `0→1`, `Deployments & Releases`, `Design System`

`role` (dziewięć pozycji):

- rozmowy z deweloperami
- **end-to-end product design**
- **prowadzenie zespołu projektantów**: podział pracy, feedback, nadzór nad efektami
- standardy projektowania dla ekosystemu
- wzorce projektowe (m.in. style i variables)
- nowe logo i brand
- **architektura informacji** i flow
- cały produkt, 50+ widoków
- **design system od zera**

`challenge`: „Jedno miejsce na zarządzanie pipeline'ami, środowiskami, deploymentami i release'ami. Najpierw trzeba było zrozumieć je jako obiekty i zależności między nimi, zanim dało się je pogrupować w ekrany. Użytkownikami byli deweloperzy, więc narzędzie musiało mówić ich językiem. Do tego koordynacja pracy trzech projektantów i wspólny wzorzec, żeby nasze prace działały w jednym ekosystemie, plus zbudowanie kultury feedbacku i współpracy."

`solution`: „Siedem obszarów połączonych ze sobą, m.in. project, deployment, environment i release management. Najważniejsze informacje widać od razu na dashboardzie, a przejście między projektami i między obszarami jednego projektu idzie bez wracania do menu. Dev wchodzi po stan i dostaje go na pierwszym ekranie, w szczegóły schodzi dopiero wtedy, kiedy sam tego chce. To był cały ekosystem projektowany równocześnie przez trzech projektantów, więc spójność nie brała się sama: wypracowane patterny projektowe, biblioteki oraz ustalone variables i style w Figmie. Design system zbudowany od zera trzymał te 50+ widoków w spójnych ramach."

- [ ] **Step 7: Wpisz teksty PL — produkt 04**

`eyebrow`: `04 · DATA ANALYTICS`, `title`: „Platforma do analizy danych"

`intro`: „Platforma do analizy danych, narzędzie dla analityków. Zbieranie surowych danych z data lake, budowanie pipeline'ów dla kolejnych etapów, katalogi danych, modelowanie i pluginy. Działające MVP miało powstać w 3 miesiące. Prowadziłam dwuosobowy zespół projektantów, ze mną włącznie."

`tags`: `Data Analytics`, `Heavy Data`, `Data Lake`, `0→1`, `MVP`

`role` (jedenaście pozycji — najdłuższa lista z czterech):

- **prowadzenie zespołu projektantów**: podział pracy, feedback, nadzór nad efektami
- trzy **spotkania z analitykami danych**: jak wygląda ich praca, czego potrzebują, jakim językiem mówią
- **architektura informacji** całej platformy
- flow dla kolejnych etapów pracy z danymi
- zbieranie surowych danych z **data lake**
- tworzenie **pipeline'ów**: lake, normalization, modeling
- katalogi danych i modelowanie
- pluginy po stronie source i destination, na przykład BigQuery
- moduł **użytkowników, ról i uprawnień** razem z definicjami i klasyfikacją
- ekrany i **klikalny prototyp** całego MVP
- procesy pracy zespołu przeniesione z poprzedniego projektu

`challenge`: „Analitycy potrzebowali jednego narzędzia na całą drogę danych, od surowych plików w data lake po gotowy model. Trzy miesiące na działające MVP, przy ograniczonych zasobach. Dużo zagadnień, analiz, danych i metryk naraz. Wcześniej pracowałam z danymi już przetworzonymi, a tu po raz pierwszy weszłam w fazę zbierania surowych danych i ich obrabiania. Do tego czas: to był jeden wielki sprint dowożenia."

`solution`: „MVP narzędzia do zbierania danych z data lake, z tworzeniem pipeline'ów dla kolejnych etapów, osobno lake, normalization i modeling. Do tego katalogi danych, modelowanie oraz dodawanie i zarządzanie pluginami po stronie source i destination, na przykład BigQuery. Osobny moduł na użytkowników, role, definicje i klasyfikację. Współpraca z drugim projektantem ułożyła się od razu, bo procesy miałam już wypracowane na poprzednim projekcie i dało się je przenieść na ten projekt. To mocno przyspieszyło prace."

- [ ] **Step 8: Napisz wersję EN**

Tłumaczenie robi implementujący, w tonie pozostałych case studies: rzeczowo, konkretnie, bez marketingowego lania wody. Wzorzec do podejrzenia: `src/copy/raporty.copy.tsx` i `src/copy/client-acquisition.copy.tsx`.

Zasady:

- Nazwy produktów i `eyebrow` zostają bez zmian — są już po angielsku
- `heroTitle` → `Two years, four products`
- `roleHeading` / `challengeHeading` / `solutionHeading` → `My role` / `The challenge` / `The solution`
- `ndaLabel` zostaje `Under NDA` w obu językach
- Cytat w produkcie 02 jest po angielsku w oryginale — nie tłumacz go i nie zmieniaj w EN
- Pogrubienia w `heroLead` muszą paść na odpowiadające frazy, nie na te same pozycje w zdaniu
- `alt` obrazków też tłumacz — to tekst dla czytników ekranu, nie identyfikator

- [ ] **Step 9: Sprawdź symetrię PL/EN**

Run: `npm run build`
Expected: PASS. Błąd typu „Property 'x' does not exist on type" oznacza pole obecne tylko w jednym języku.

- [ ] **Step 10: Commit**

```bash
git add src/copy/codete.copy.tsx
git commit -m "Write the Codete case study in both languages"
```

---

### Task 4: Strona — sekcja intro i szkielet

**Files:**
- Create: `src/pages/CodeteCaseStudy.tsx`

**Interfaces:**
- Consumes: `copy` z `@/copy/codete.copy`, `NdaImage` z Task 1, assety z Task 2
- Produces: `CodeteCaseStudy()` — komponent bez propsów, importowany przez `Projects.tsx` w Task 6

**Wzorzec:** `src/pages/RaportyCaseStudy.tsx`. Skopiuj z niego lokalne helpery `fadeUp`, `staggerParent`, `Reveal`, `StaggerGroup`, `StaggerItem`, `HeroStagger` — są zdefiniowane lokalnie w tamtym pliku, nie eksportowane.

- [ ] **Step 1: Szkielet z ChapterRail**

```tsx
const CHAPTER_IDS = ["intro", "management", "reconciliation", "devtools", "analytics"] as const
```

Zewnętrzny `<div id="top">` z tymi samymi stylami co w `RaportyCaseStudy.tsx:163`:
`display: flex`, `flexDirection: column`, `gap: clamp(56px, 10vw, 120px)`, `padding: clamp(56px, 8vw, 96px) 0`, `alignItems: center`, `width: 100%`, `boxSizing: border-box`.

Pod nim `<ChapterRail chapters={chapters} topOffset={24} />`, gdzie:

```tsx
const chapters = CHAPTER_IDS.map((id) => ({ id, label: t.chapters[id] }))
```

- [ ] **Step 2: Sekcja intro**

`<Section gap={80} id="intro">` z `HeroStagger`, w środku trzy `StaggerItem`:

1. `<header>` z `gap: 40`: blok eyebrow plus `<h1>` (`gap: 24`), potem `heroLead`, potem `ndaNote`. Typografia jak w `RaportyCaseStudy.tsx:170-186` — eyebrow `16px/22px`, `letterSpacing: 0.1em`, `--pf-text-muted`; h1 `clamp(40px, 10vw, 126px)`, `--pf-font-display`; akapity `22px/34px`, `--pf-text-body`.
2. `<MetaBar items={t.metaBar} />`
3. `<img src="/codete-cover.webp" alt={t.coverAlt} style={{ width: "100%", height: "auto", display: "block" }} />`

- [ ] **Step 3: Sprawdź build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CodeteCaseStudy.tsx
git commit -m "Open the Codete case study with the two-year framing"
```

---

### Task 5: Strona — cztery bloki produktowe

**Files:**
- Modify: `src/pages/CodeteCaseStudy.tsx`

**Interfaces:**
- Consumes: `Product` z `@/copy/codete.copy` (Task 3), `NdaImage` (Task 1)
- Produces: nic dla dalszych zadań

**Kluczowa decyzja:** cztery bloki mają identyczny rytm, więc renderuje je jeden lokalny komponent `ProductBlock` w pętli po `t.products`, a nie cztery skopiowane kawałki JSX. Różnice (`stats`, `quote`) są opcjonalne i renderowane warunkowo.

- [ ] **Step 1: Napisz `ProductBlock`**

Lokalny komponent w pliku strony, poniżej helperów animacji:

```tsx
function ProductBlock({ product, id, ndaLabel }: { product: Product; id: string; ndaLabel: string }) {
  return (
    <Section id={id}>
      {/* naglowek: eyebrow, h2, tagi */}
      {/* opis */}
      {/* dwie kolumny: role plus heroImage */}
      {/* opcjonalnie: rzad StatCard */}
      {/* wyzwanie plus opcjonalny QuoteBlock */}
      {/* imagesAfterChallenge */}
      {/* rozwiazanie */}
      {/* imagesAfterSolution */}
    </Section>
  )
}
```

Szczegóły układu:

- **Nagłówek:** eyebrow jak w intro, `<h2>` `clamp(32px, 6vw, 56px)` `--pf-font-display`, tagi jako `<Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">` w `flex flex-wrap gap-2`
- **Dwie kolumny:** `grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)] gap-10`, lewa to `roleHeading` plus `<ul>` z `role`, prawa to `<NdaImage>` z `product.heroImage`
- **Rząd statystyk:** `StaggerGroup` z `grid-cols-1 md:grid-cols-3 gap-6`, po `<StatCard>` na wpis. Renderuj tylko gdy `product.stats` istnieje.
- **Cytat:** `<QuoteBlock>` zaraz pod akapitem `challenge`, tylko gdy `product.quote` istnieje. Sprawdź w `src/components/raporty-ds/content/QuoteBlock.tsx`, jakich propsów oczekuje.
- **Rzędy obrazków:** `grid` o liczbie kolumn równej `images.length` na `md`, `grid-cols-1` poniżej, `gap-6`
- Każdy blok owinięty w `Reveal`, żeby wjeżdżał przy scrollu — zgodnie z DESIGN_SYSTEM §6

- [ ] **Step 2: Wyrenderuj cztery bloki**

Poniżej sekcji intro, w tym samym kontenerze:

```tsx
{t.products.map((product, i) => (
  <ProductBlock
    key={CHAPTER_IDS[i + 1]}
    id={CHAPTER_IDS[i + 1]}
    product={product}
    ndaLabel={t.ndaLabel}
  />
))}
```

`CHAPTER_IDS[i + 1]` — przesunięcie o jeden, bo `CHAPTER_IDS[0]` to `intro`.

- [ ] **Step 3: Sprawdź build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CodeteCaseStudy.tsx
git commit -m "Lay out all four products on one rhythm"
```

---

### Task 6: Podpięcie — kafelek i modal

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/components/sections/Projects.tsx:8-25`

**Interfaces:**
- Consumes: `CodeteCaseStudy` z Task 4/5, `/codete-cover.webp` z Task 2
- Produces: działający adres `/case-study/codete`

**Jak tu działa routing:** route'y generują się z `galleryPaths()`, czyli z listy projektów mających `href`. `src/main.tsx` nie wymaga zmian. Stronę trzeba dopisać do mapy `modalContent`, inaczej modal otworzy się pusty.

- [ ] **Step 1: Dodaj wpis do `projects.ts`**

Trzeci w tablicy, zaraz po Client Acquisition:

```ts
  {
    title: "Case Study - Codete",
    title_pl: "Case study - Codete",
    description: "Dwa lata, cztery produkty B2B - kazdy w innej domenie.",
    description_en: "Two years, four B2B products, each in a different domain.",
    tag: "Case Study",
    featured: true,
    bg: "bg-slate-50",
    image: "/codete-cover.webp",
    href: "/case-study/codete",
  },
```

Uwaga: w `description` wpisz polską wersję z prawdziwym myślnikiem i polskimi znakami — powyżej jest uproszczona, żeby plan dało się skopiować bez pułapek cytowania.

`bg` dobierz do okładki po obejrzeniu jej w preview — ma współgrać z `bg-indigo-50` i `bg-violet-50` obok.

- [ ] **Step 2: Zarejestruj stronę w modalu**

W `src/components/sections/Projects.tsx` dopisz import obok pozostałych:

```tsx
import { CodeteCaseStudy } from "@/pages/CodeteCaseStudy"
```

i wpis w mapie `modalContent`, po `client-acquisition`:

```tsx
  "/case-study/codete": () => <CodeteCaseStudy />,
```

- [ ] **Step 3: Sprawdź build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts src/components/sections/Projects.tsx
git commit -m "Put Codete on the shelf next to the other two case studies"
```

---

### Task 7: Poprawka nieaktualnej instrukcji w CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` §6

**Interfaces:**
- Consumes: nic
- Produces: nic

Krok 3 w §6 mówi „Dodaj route w `src/main.tsx`". To nieprawda od czasu, gdy projekty stały się modalami — właśnie ta instrukcja wyprowadziłaby następną osobę na manowce.

- [ ] **Step 1: Popraw krok 3**

Zastąp:

```
3. Dodaj route w `src/main.tsx`
```

przez:

```
3. Zarejestruj stronę w mapie `modalContent` w `src/components/sections/Projects.tsx` — route powstanie sam z `galleryPaths()` w `projects.ts`. `src/main.tsx` ruszasz tylko dla stron spoza galerii (np. `/case-study/raporty-v1`).
```

Plik ma polskie znaki, ale to edycja istniejącego pliku, więc Edit jest tu dozwolony.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Stop pointing the next reader at main.tsx for a project route"
```

---

### Task 8: Weryfikacja końcowa

**Files:** brak zmian

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: PASS bez błędów i ostrzeżeń TS.

- [ ] **Step 2: Preview**

`preview_start "portfolio"`, potem sprawdź kolejno:

- strona główna: kafelek Codete jest trzeci, duży, okładka się ładuje
- kliknięcie kafelka otwiera modal pod `/case-study/codete`
- ChapterRail pokazuje pięć kropek i podąża za scrollem
- każdy obrazek NDA ma plakietkę i jest rozmyty
- przełączenie PL/EN nie psuje układu i tłumaczy wszystkie teksty

**Uwaga przy weryfikacji scrolla:** strona ma globalnie `scroll-behavior: smooth`. Scrolluj przez `el.scrollIntoView({ behavior: "instant", block: "..." })`, inaczej złapiesz stronę w trakcie przewijania i zobaczysz nieistniejący bug.

**Uwaga przy klikaniu PL/EN:** React batchuje update, więc odczyt DOM zaraz po `.click()` może pokazać stary stan. Klikaj przez `preview_click` z selektorem albo owiń odczyt w `setTimeout(..., 200)`.

- [ ] **Step 3: Sprawdź szerokość telefonu**

`resize_window` preset `mobile`. Rzędy obrazków muszą zwinąć się do jednej kolumny, ChapterRail ma zniknąć poniżej `lg`.

- [ ] **Step 4: Ostatnie sprawdzenie NDA**

Run: `ls public/codete-*`
Expected: same `.webp`. Zero plików skopiowanych wprost z Second Brain.

- [ ] **Step 5: Zgłoś gotowość**

Nie robić `git push`. Poinformować użytkowniczkę, że case study jest gotowe do przejrzenia, i poczekać na decyzję o pushu oraz na akceptację tłumaczenia EN.
