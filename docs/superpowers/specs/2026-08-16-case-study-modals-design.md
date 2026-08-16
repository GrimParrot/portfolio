# Case study jako modale — ujednolicenie wyświetlania projektów

Data: 2026-08-16

## Problem

Portfolio otwiera projekty na dwa różne sposoby. Pięć projektów z galerii —
Naturalnie, Kafejeto, Stats, Dashboard i case study Banneroza — otwiera się
w modalu nad stroną główną. Dwa case study, Raporty i Client Acquisition, mają
własne strony z navbarem, przyciskiem powrotu i stopką kontaktową.

Ta różnica nie wynika z niczego poza kolejnością, w jakiej powstawały. Dla
odwiedzającego oznacza dwa różne modele nawigacji w jednej siatce kafelków:
część projektów zamyka się przyciskiem X, część wymaga cofnięcia się w
historii przeglądarki.

## Cel

Wszystkie projekty otwierają się tak samo — w modalu, pod własnym adresem URL.

## Decyzje

1. **Chrome strony znika w całości.** Oba case study tracą `<Navbar />`,
   `<BackToPortfolio />` i stopkę `<Contact />` — czyli przyjmują dokładnie ten
   kształt, który ma dziś `BannerozaPage`. Wyjście z modala: X, Esc albo Back.
2. **Bez przełącznika PL/EN w modalu.** Język wybiera się na stronie głównej
   przed otwarciem projektu. Stan obecny dla galerii zostaje bez zmian.
3. **Podział siatki zostaje.** Sekcje "Wybrane case study" i "Galeria
   projektów" nie ruszają się. `featured` przestaje znaczyć "ma własną stronę"
   i znaczy odtąd wyłącznie "duży kafelek w sekcji wyróżnionej".
4. **Ramka modala przestaje narzucać szerokość treści** (wariant A z rozmowy).
   Alternatywa — prop `bleed` włączany tylko przez case study — została
   odrzucona: wprowadzałaby dwa tryby wyświetlania w komponencie, którego
   zadaniem jest właśnie ujednolicenie.

## Architektura

### Routing i dane

`galleryPaths()` w `src/data/projects.ts` przestaje filtrować po `!featured`
i zwraca wszystkie `href`. Po tej zmianie modal nie jest podzbiorem projektów,
tylko sposobem wyświetlania każdego z nich. Trzy miejsca czytające tę listę —
router, guard scrolla w `main.tsx` i `Projects` — dostają nową zawartość bez
zmiany kształtu, więc żadne z nich nie może wypaść z synchronizacji.

Z `src/main.tsx` znikają route'y `/case-study/raporty`
i `/case-study/client-acquisition` wraz z importami komponentów. Do mapy
`modalContent` w `src/components/sections/Projects.tsx` dochodzą dwa wpisy pod
tymi samymi ścieżkami. Komentarz przy funkcji `open()`, mówiący dziś że
"featured projects navigate to their own page", przestaje być prawdziwy
i wymaga aktualizacji — tak samo komentarz nad `galleryPaths`, który tłumaczy
wyprowadzenie listy z `featured`.

Adresy `/case-study/raporty` i `/case-study/client-acquisition` pozostają
niezmienione, więc linki z CV i LinkedIna nadal działają — otwierają teraz
stronę główną z modalem.

### Zawartość modala

W `RaportyCaseStudy.tsx` i `ClientAcquisitionCaseStudy.tsx`:

- usunięcie `<Navbar />`, `<BackToPortfolio />` i `<Contact />` wraz z importami,
- `ChapterRail` dostaje `topOffset={24}` zamiast domyślnego `100` — w modalu nie
  ma fixed navbara do ominięcia, jest tylko oddech nad nagłówkiem,
- górny padding wrappera (`clamp(96px, 14vw, 160px)`) rezerwował miejsce pod
  navbar; wartość startowa po zmianie to `clamp(56px, 8vw, 96px) 0`,
  korygowana tylko wtedy, gdy porównanie z Banneroza w preview pokaże
  wyraźną różnicę w oddechu nad nagłówkiem.

`BackToPortfolio.tsx` zostaje po tej zmianie bez żadnego użycia w kodzie —
komponent do usunięcia.

`ChapterRail` nie wymaga zmian: `nearestScroller()` już rozpoznaje oba
konteksty scrollowania, bo Banneroza działa w modalu od commita
"Give the three case studies one chapter rail".

`raporty-ds.css` jest w całości scope'owany klasami `.pf-*`, więc jego wejście
do bundle'a strony głównej nie może wpłynąć na nic poza case study.

### Szerokość i pasy tła

`Section` z `variant="subtle" | "dark" | "accent"` rozlewa tło na całą
szerokość rodzica, a treść trzyma na kolumnie 1200px. Dziś `ProjectModal`
zamyka całą zawartość w `max-w-[1200px] mx-auto`, więc po przeniesieniu pasy
przestałyby dochodzić do krawędzi ramki.

Rozwiązanie: `ProjectModal` przestaje ustawiać `max-w-[1200px] mx-auto` na
kontenerze treści. Sam `<div ref={contentRef}>` musi zostać — trzyma go
instancja Lenis scopowana do modala. Kolumnę 1200px przejmują komponenty,
które na niej polegały, po jednej linijce każdy:

- `SimpleProjectPage.tsx` (obsługuje Naturalnie, Kafejeto, Stats, Dashboard),
- `BannerozaPage.tsx`.

Podział ról po zmianie: modal odpowiada za ramkę, scroll i zamykanie, treść za
własną szerokość.

## Zakres zmian

| Plik | Zmiana |
|---|---|
| `src/data/projects.ts` | `galleryPaths()` bez filtra `!featured` + komentarz |
| `src/main.tsx` | minus 2 route'y i 2 importy |
| `src/components/sections/Projects.tsx` | plus 2 wpisy w `modalContent`, aktualizacja komentarza |
| `src/pages/RaportyCaseStudy.tsx` | chrome out, `topOffset`, padding |
| `src/pages/ClientAcquisitionCaseStudy.tsx` | chrome out, `topOffset`, padding |
| `src/components/ProjectModal.tsx` | zdjęcie `max-w-[1200px] mx-auto` |
| `src/components/SimpleProjectPage.tsx` | własna kolumna 1200px |
| `src/pages/BannerozaPage.tsx` | własna kolumna 1200px |
| `src/components/BackToPortfolio.tsx` | usunięcie pliku |

## Weryfikacja

Projekt nie ma testów automatycznych — weryfikacja przez build i preview.

1. `npm run build` — Vercel odpala pełny `tsc -b` przy deployu.
2. Oba case study otwarte z kafelka na stronie głównej.
3. Oba otwarte z bezpośredniego URL-a po odświeżeniu strony.
4. Pasy `subtle` i `dark` dochodzą do zaokrąglonej ramki modala.
5. ChapterRail: klik przewija kontener modala (nie stronę pod spodem),
   aktywny rozdział podświetla się przy scrollu.
6. Scroll Lenis wewnątrz modala, wyjście przez X, Esc i Back.
7. Regresja szerokości: cztery modale galerii i Banneroza po zdjęciu capa.
8. 375px — rail ukryty poniżej `lg`, treść bez poziomego scrolla.

## Poza zakresem

- Układ siatki na stronie głównej.
- Przełącznik PL/EN w modalu.
- Stopka Contact w modalu — czytelnik kończy case study i zamyka modal,
  zamiast trafić na CTA. Świadomie zaakceptowane.
- `NextProject.tsx` nie ma żadnego użycia od commita, który usunął kartę
  "następny projekt". Martwy plik niezwiązany z tą zmianą — do osobnego
  sprzątnięcia.
