# Case study „Codete — dwa lata, cztery produkty"

Data: 2026-08-24
Źródło projektu: Figma `Realizajce`, node `558:93167` (frame „Reports")

## 1. Cel

Dodać do portfolio jedno case study opisujące dwuletnią pracę w Codete nad
czterema produktami B2B. Materiały wizualne są objęte NDA i w projekcie
występują jako rozmyte zrzuty z plakietką „Under NDA".

## 2. Zakres

Jedna strona case study pod adresem `/case-study/codete`, otwierana jako modal
nad stroną główną (tak działa każdy projekt w tym portfolio), plus kafelek na
liście projektów.

Poza zakresem: osobne podstrony per produkt, zmiany w istniejących case
studies, nowe komponenty design systemu poza jednym opisanym niżej.

## 3. Routing — jak to faktycznie działa

`src/main.tsx` nie dostaje nowego route'u. Route'y projektowe generują się z
`galleryPaths()` w `src/data/projects.ts`, a stronę rejestruje się w mapie
`modalContent` w `src/components/sections/Projects.tsx`.

Cztery miejsca do zmiany:

1. `src/copy/codete.copy.tsx` — nowy plik z tekstami PL/EN
2. `src/pages/CodeteCaseStudy.tsx` — nowy plik, wzorowany na `RaportyCaseStudy.tsx`
3. `src/components/sections/Projects.tsx` — wpis `"/case-study/codete": () => <CodeteCaseStudy />`
4. `src/data/projects.ts` — wpis projektu z `href: "/case-study/codete"`

Dodatkowo: `CLAUDE.md` §6 krok 3 mówi „Dodaj route w `src/main.tsx`", co jest
nieaktualne. Poprawić na opis powyżej.

## 4. Struktura strony

Układ pionowy, 1:1 z Figmą. Rozważone i odrzucone: zakładki per produkt
(rozbijają narrację „dwa lata, cztery produkty" i wprowadzają nawigację,
której w projekcie nie ma) oraz cztery osobne podstrony (każdy produkt osobno
jest za chudy na własne case study).

```
s01  intro
s02  01 · Management platform
s03  02 · Data reconciliation
s04  03 · Dev tools
s05  04 · Data analytics
```

### s01 — intro

- eyebrow `PROJECTS · CODETE`
- h1 „Dwa lata, cztery produkty"
- lead z pogrubieniami (2-letnia praca, cztery złożone produkty B2B, design system od zera, end-to-end)
- osobny akapit z notą o NDA
- `MetaBar` z czterema komórkami: MOJA ROLA / PRODUKTY / SKALA / DESIGN SYSTEMY
- obrazek okładkowy (kolaż) z frame'a `cover`, node `586:150137`

### s02–s05 — bloki produktowe

Każdy blok trzyma ten sam rytm:

1. eyebrow `01 · Management platform`
2. h2 (tytuł produktu)
3. rząd pigułek tagów (`Badge variant="secondary"`)
4. akapit opisu produktu
5. dwie kolumny: nagłówek „Moja rola" + lista punktów (lewa), obrazek NDA (prawa)
6. **tylko s02:** rząd trzech `StatCard` — 8 ról w rdzeniu systemu / 100+ zaprojektowanych ekranów / 4 główne typy zamówień
7. nagłówek „Wyzwanie" + akapit; **w s03** akapit zawiera cytat z wywiadów użytkowników
8. rząd obrazków NDA
9. nagłówek „Rozwiązanie" + akapit
10. rząd obrazków NDA

Liczba obrazków w rzędzie różni się między blokami (2–4) i wynika z projektu.

### ChapterRail

Pięć kotwic, po jednej na sekcję. `topOffset={24}`, bez własnego akcentu
(fallback near-black), tak jak w Raporty i Client Acquisition.

## 5. Obrazki pod NDA

**Decyzja: do repozytorium nie trafia żaden ostry oryginał.**

Ostre pliki źródłowe leżą w Second Brain (`materials/Nowy folder (3)/<podfolder produktu>`). Odrzucone podejście: skopiować je do
`public/` i rozmyć w CSS — plik w `public/` jest publiczny, a `filter: blur()`
wyłącza się jednym kliknięciem w devtoolsach, więc materiał pod NDA byłby
realnie dostępny.

Przyjęte podejście:

- Rozmycie pochodzi z eksportu Figmy (jest wypalone w pikselach)
- Plakietka „Under NDA" jest odtworzona w kodzie, nie wypalona w obrazku

Powód rozdzielenia: gdyby cały rząd czterech obrazków był jednym eksportem,
nie zwinąłby się na szerokości telefonu. Osobne pliki + nakładka w React
zachowują responsywność.

### Pobranie assetów

`get_design_context` na blokach produktowych zwraca lokalne URL-e assetów
serwowane przez Figma desktop. Pobrać je przez `curl` do `public/`, nazwa
`codete-[blok]-[opis].png`, następnie skompresować do WebP zgodnie z
CLAUDE.md §8 i zaktualizować odwołania na `.webp`.

Fallback, gdyby URL-e assetów nie były serwowane: poprosić użytkowniczkę
o ręczny eksport z Figmy do folderu materiałów.

## 6. Komponenty

Bez nowego design systemu. Wykorzystane istniejące z `src/components/raporty-ds/`:
`Section`, `SectionHeader`, `MetaBar`, `StatCard`, `QuoteBlock`, `Divider`,
plus `Badge` z `ui/` i `ChapterRail`. Animacje wg konwencji z DESIGN_SYSTEM §6:
`Reveal` / `StaggerItem`, count-up na liczbach w `StatCard`.

### Nowy komponent: `NdaImage`

Jedyny nowy element. Umiejscowienie: `src/components/raporty-ds/content/NdaImage.tsx`,
eksport dopisany do `src/components/raporty-ds/index.ts`.

- **Co robi:** renderuje rozmyty zrzut z wyśrodkowaną nakładką „Under NDA"
- **Interfejs:** `{ src: string; alt: string; label: string; aspect?: string }` —
  `label` przychodzi z copy, żeby przetłumaczyć plakietkę na EN
- **Od czego zależy:** nic poza `lucide-react` (ikona) i tokenami kolorów

Rzędy obrazków i układ dwukolumnowy „Moja rola" + obrazek to zwykły
flex/grid w pliku strony, spójnie z tym jak robi to `RaportyCaseStudy.tsx`.

## 7. Dwujęzyczność

Copy w Figmie istnieje tylko po polsku. Wersję angielską piszę ja, w tonie
pozostałych case studies (rzeczowo, konkretnie, bez marketingowego lania
wody); użytkowniczka sprawdza ją przed pushem.

`copy.pl` i `copy.en` muszą mieć identyczny kształt — inaczej `tsc -b` wywali
się dopiero na Vercelu (CLAUDE.md §6).

Plakietka „Under NDA" jest polem w copy, nie stałą w komponencie.

## 8. Kafelek na stronie głównej

Trzeci wpis w `src/data/projects.ts`, za Raporty i Client Acquisition:

- `tag: "Case Study"`
- `featured: true`
- `href: "/case-study/codete"`
- cover: eksport frame'a `cover` (node `586:150137`), skompresowany do WebP
- `bg`: kolor tła dobrany do okładki, spójny z sąsiednimi kafelkami

## 9. Weryfikacja

1. `npm run build` — Vercel odpala pełne `tsc -b` przy deployu, błędy typów
   z rozjechanego kształtu PL/EN wychodzą dopiero tam
2. Przegląd w preview: strona główna (kafelek), otwarcie modala, przewinięcie
   całości, ChapterRail, oba języki
3. Sprawdzić, że żaden ostry oryginał nie trafił do `public/`

## 10. Ryzyka

- **Ucięte copy w metadanych Figmy** — lista „Moja rola" w bloku 04 i część
  etykiet tagów są w odczycie metadanych skrócone. Pełne teksty dociągnąć
  przez `get_design_context` przy budowie pliku copy, nie zgadywać.
- **Długość strony** — projekt ma ~12 250 px wysokości. ChapterRail jest tu
  konieczny, nie opcjonalny.
