# Projekt galeryjny „PlanujemyTo"

Data: 2026-08-24
Źródło: Figma `Realizajce`, frame „PlanujemyTo", node `507:70992`
Gałąź: `master` (projekt jest publikowalny, bez NDA)

## 1. Cel

Dodać do galerii projektów stronę PlanujemyTo — darmowej aplikacji do planowania
wydarzeń. Projekt obejmuje markę, produkt i design system, więc strona ma trzy
sekcje merytoryczne, a nie samą galerię zrzutów.

## 2. Dlaczego osobna strona, a nie `SimpleProjectPage`

Cztery istniejące projekty galeryjne (Naturalnie, Kafejeto, Stats, Dashboard)
stoją na wspólnym `SimpleProjectPage`, który zna: eyebrow, tytuł, opis, tagi,
okładkę i sekcje w kształcie *tytuł + obrazki*.

PlanujemyTo tego kształtu nie wypełnia. Potrzebuje numerowanych sekcji
(`01 · Brand`), własnego akapitu opisu w każdej z nich oraz **siatki z paletą
kolorów**, której ten komponent nie ma.

Rozważone i odrzucone:

- **Rozszerzenie `SimpleProjectPage`** o opcjonalny eyebrow, opis sekcji i blok
  palety. Docelowo mniej kodu, ale dokłada trzy opcjonalne pola do komponentu
  niosącego cztery działające strony, z których każdą trzeba by potem przejrzeć
  w przeglądarce. Brak testów w projekcie czyni to realnym ryzykiem regresji.
- **Spłaszczenie projektu** do kształtu, który komponent już zna. Odpada:
  gubi paletę i wszystkie akapity, czyli większość treści.

**Decyzja:** osobna `src/pages/PlanujemyToPage.tsx`, wzorowana na stronach case
study. Cztery istniejące strony galeryjne zostają nietknięte.

## 3. Kolor akcentu

Projekt ma własną paletę. Akcentem strony jest **`#8585FF`** (Violet).

Zastosować ten sam mechanizm co przy Codete: przepiąć tokeny akcentu na
korzeniu strony (`--pf-accent-500`, `--pf-text-accent`) zamiast wpisywać hex w
poszczególne elementy. Obrys obrazków zostaje neutralny (`--pf-hairline`).

## 4. Struktura strony

```
intro          eyebrow → h1 → lead → okładka dwukolumnowa
01 · Brand     Identyfikacja i system znaku
02 · Kolory    Paleta i hierarchia kolorów
03 · Produkt   Aplikacja i panel na jednym systemie
zamknięcie     znak na polu marki
```

## 5. Teksty (PL, przepisane z Figmy dosłownie)

### Intro

- eyebrow: `BRAND & PRODUKT · PLANUJEMYTO`
- h1: `PlanujemyTo, razem.` — człon **PlanujemyTo** w kolorze `#8585FF`,
  `, razem.` w near black. To jedna linia tekstu z dwoma kolorami, nie dwa
  osobne nagłówki.
- lead:

„PlanujemyTo to darmowa aplikacja do planowania wydarzeń: wesela, chrzciny,
urodziny, osiemnastki, wycieczki. Zamiast pustej listy użytkownik wybiera typ
wydarzenia, a aplikacja podpowiada zadania, które przy takiej imprezie i tak
trzeba odhaczyć, każde z datą, miejscem i notatką. Projekt, w którym
odpowiadałam za całość warstwy wizualnej i produktowej: markę, architekturę
informacji, flow, interfejs aplikacji i panelu administracyjnego oraz design
system, na którym oba stoją."

### 01 · Brand — „Identyfikacja i system znaku"

Akapit 1:

„Marka musiała unieść wiele typów wydarzeń naraz, od chrzcin po osiemnastkę,
więc nie mogła pójść w motyw żadnego z nich. Zbudowałam ją wokół checkboxa
symbolizującego wykonane zadanie oraz balonów, które są nieodłącznym elementem
wielu wydarzeń. Te dwa symbole opisują całe działanie produktu, a złożone w
jeden kształt odzwierciedlają serce PlanujemyTo."

Akapit 2:

„Znak dostał komplet zastosowań, których produkt naprawdę potrzebuje: wersję
poziomą, sygnet solo, warianty mono na jasnym i ciemnym tle oraz ikonę
aplikacji w czterech wariantach kolorystycznych. Sygnet jest na tyle prosty, że
bez problemów schodzi do rozmiaru favicony."

Obrazki, w tej kolejności: lockup znaku, „Idea" (checkbox + balon), „Mono"
(dwa panele obok siebie), „icons" (cztery warianty ikony aplikacji).

### 02 · Kolory — „Paleta i hierarchia kolorów"

Akapit 1:

„Paleta stoi na jednym intensywnym fiolecie i czterech dopełnieniach, które mu
ustępują. Lawenda niesie tła i podświetlenia, głęboki granatofiolet trzyma
typografię i ciemne warianty znaku, biel i near black domykają zakres
kontrastu."

Akapit 2:

„Fiolet zostawiłam wyłącznie na akcje: przyciski, stany aktywne, sygnet. Przy
produkcie, w którym jednocześnie żyje kilkanaście zadań, statusów i list, jeden
zarezerwowany kolor akcji robi za nawigację po tym, gdzie w ogóle można
kliknąć."

### 03 · Produkt — „Aplikacja i panel na jednym systemie"

Akapit 1:

„Aplikacja prowadzi jedno wydarzenie od początku do końca. Użytkownik wybiera
typ, dostaje podpowiedzianą listę zadań i od razu pracuje na konkretach: każde
zadanie ma datę, godzinę, miejsce i notatkę, a kafelek wydarzenia pokazuje, ile
dni zostało. Odhaczenie jest jedyną akcją, którą trzeba zrozumieć, żeby zacząć."

Akapit 2:

„Obok warstwy użytkownika zaprojektowałam panel administracyjny: typy wydarzeń,
zadania, użytkownicy i grupy. To on decyduje o tym, co produkt podpowie na
starcie, więc wymagał tyle samo uwagi co sama aplikacja, mimo że nie widzi go
żaden użytkownik."

Akapit 3:

„Całość stoi na design systemie zbudowanym pod ten produkt: typografia, kolory,
formularze, tabele, kafelki, stany pustej listy. Dzięki niemu aplikacja i panel
wyglądają jak jeden produkt, a nie dwa osobne."

Obrazki: cztery zrzuty pełnej szerokości — event app, login, system, components.

## 6. Siatka palety (renderowana w kodzie, nie obrazek)

Pięć pól, każde z próbką koloru oraz podpisem: hex nad nazwą.

```
rzad 1 (wys. 320)   Violet 800px  |  Lavender 376px (wys. 153)
                                  |  Deep Purple 376px (wys. 153)
rzad 2 (wys. 200)   White 593px   |  Near Black 583px
```

| Hex | Nazwa | Uwaga |
|---|---|---|
| `#8585FF` | Violet | pole duże, podpis w near black |
| `#C2C2FF` | Lavender | podpis w near black |
| `#40386D` | Deep Purple | podpis jasny |
| `#FFFFFF` | White | pole potrzebuje obrysu, inaczej zniknie na białym tle |
| `#151515` | Near Black | podpis jasny |

Poniżej `md` siatka schodzi do jednej kolumny.

## 7. Kafelek w galerii

Wpis w `src/data/projects.ts`, w części galeryjnej (bez `featured`).

- `tag: "UI"` — projekt aplikacji i panelu, tak jak Naturalnie i Kafejeto.
  Filtry są obecnie ukryte w `Projects.tsx`, a kafelki renderują się z
  `showTag={false}`, więc tag nie jest dziś widoczny; ustawiamy go poprawnie na
  przyszłość.
- `image: "/planujemyto-cover.webp"`
- `href: "/ui/planujemyto"`
- `bg`: blade lawendowe tło spod palety projektu

Rejestracja w mapie `modalContent` w `src/components/sections/Projects.tsx` —
route wygeneruje się sam z `galleryPaths()`.

## 8. Dwujęzyczność

Copy w Figmie istnieje wyłącznie po polsku. Wersję angielską pisze
implementujący, w tonie pozostałych plików copy; użytkowniczka akceptuje ją
przed pushem. `copy.pl` i `copy.en` muszą mieć identyczny kształt, inaczej
`tsc -b` wywali się dopiero na Vercelu.

## 9. Weryfikacja

1. `npm run build`
2. Przegląd w preview: kafelek w galerii, otwarcie modala, przewinięcie strony,
   siatka palety, oba języki, szerokość telefonu
3. Potwierdzić, że tokeny akcentu nie wyciekły poza tę stronę — pozostałe
   projekty mają zostać niebieskie

## 10. Ryzyka

- **Karta Figmy gubi się w trakcie sesji.** Dlatego wszystkie teksty są wyżej
  przepisane dosłownie: budowa copy nie wymaga już dostępu do pliku.
- **Białe pole w palecie** zniknie na białym tle strony, jeśli nie dostanie
  obrysu. To jedyne pole wymagające osobnego traktowania.
