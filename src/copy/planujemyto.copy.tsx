import { projectTags } from "@/data/projectTags"

export type CopyImage = { src: string; alt: string }

export type PaletteEntry = { hex: string; name: string }

export type SectionCopy = {
  eyebrow: string
  title: string
  paragraphs: string[]
  images: CopyImage[]
}

type PlanujemyToCopy = {
  heroEyebrow: string
  heroTags: string[]
  heroTitle: React.ReactNode
  heroLead: string
  coverImages: CopyImage[]
  sections: SectionCopy[]
  palette: PaletteEntry[]
  closingLogo: CopyImage
  closingImage: CopyImage
}

const palette: PaletteEntry[] = [
  { hex: "#8585FF", name: "Violet" },
  { hex: "#C2C2FF", name: "Lavender" },
  { hex: "#40386D", name: "Deep Purple" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#151515", name: "Near Black" },
]

export const copy: { pl: PlanujemyToCopy; en: PlanujemyToCopy } = {
  pl: {
    heroEyebrow: "BRAND & PRODUKT · PLANUJEMYTO",
    heroTags: projectTags.planujemyto,
    heroTitle: (
      <>
        <span style={{ color: "var(--pf-accent-500)" }}>PlanujemyTo</span>, razem.
      </>
    ),
    heroLead:
      "PlanujemyTo to darmowa aplikacja do planowania wydarzeń: wesela, chrzciny, urodziny, osiemnastki, wycieczki. Zamiast pustej listy użytkownik wybiera typ wydarzenia, a aplikacja podpowiada zadania, które przy takiej imprezie i tak trzeba odhaczyć, każde z datą, miejscem i notatką. Projekt, w którym odpowiadałam za całość warstwy wizualnej i produktowej: markę, architekturę informacji, flow, interfejs aplikacji i panelu administracyjnego oraz design system, na którym oba stoją.",
    coverImages: [
      { src: "/planujemyto-cover-mark.webp", alt: "Znak PlanujemyTo, checkbox połączony z balonem." },
      { src: "/planujemyto-cover-logo.webp", alt: "Logo PlanujemyTo w pełnej wersji poziomej." },
      { src: "/planujemyto-cover-app.webp", alt: "Zrzut ekranu aplikacji PlanujemyTo." },
    ],
    sections: [
      {
        eyebrow: "01 · Brand",
        title: "Identyfikacja i system znaku",
        paragraphs: [
          "Marka musiała unieść wiele typów wydarzeń naraz, od chrzcin po osiemnastkę, więc nie mogła pójść w motyw żadnego z nich. Zbudowałam ją wokół checkboxa symbolizującego wykonane zadanie oraz balonów, które są nieodłącznym elementem wielu wydarzeń. Te dwa symbole opisują całe działanie produktu, a złożone w jeden kształt odzwierciedlają serce PlanujemyTo.",
          "Znak dostał komplet zastosowań, których produkt naprawdę potrzebuje: wersję poziomą, sygnet solo, warianty mono na jasnym i ciemnym tle oraz ikonę aplikacji w czterech wariantach kolorystycznych. Sygnet jest na tyle prosty, że bez problemów schodzi do rozmiaru favicony.",
        ],
        images: [
          { src: "/planujemyto-logo-lockup.webp", alt: "Pozioma wersja logo PlanujemyTo, checkbox połączony z balonem." },
          { src: "/planujemyto-idea.webp", alt: "Szkic koncepcyjny znaku PlanujemyTo pokazujący połączenie checkboxa i balonu." },
          { src: "/planujemyto-mono.webp", alt: "Dwa panele obok siebie z monochromatycznymi wariantami znaku PlanujemyTo na jasnym i ciemnym tle." },
          { src: "/planujemyto-icons.webp", alt: "Cztery kolorystyczne warianty ikony aplikacji PlanujemyTo." },
        ],
      },
      {
        eyebrow: "02 · Kolory",
        title: "Paleta i hierarchia kolorów",
        paragraphs: [
          "Paleta stoi na jednym intensywnym fiolecie i czterech dopełnieniach, które mu ustępują. Lawenda niesie tła i podświetlenia, głęboki granatofiolet trzyma typografię i ciemne warianty znaku, biel i near black domykają zakres kontrastu.",
          "Fiolet zostawiłam wyłącznie na akcje: przyciski, stany aktywne, sygnet. Przy produkcie, w którym jednocześnie żyje kilkanaście zadań, statusów i list, jeden zarezerwowany kolor akcji robi za nawigację po tym, gdzie w ogóle można kliknąć.",
        ],
        images: [],
      },
      {
        eyebrow: "03 · Produkt",
        title: "Aplikacja i panel na jednym systemie",
        paragraphs: [
          "Aplikacja prowadzi jedno wydarzenie od początku do końca. Użytkownik wybiera typ, dostaje podpowiedzianą listę zadań i od razu pracuje na konkretach: każde zadanie ma datę, godzinę, miejsce i notatkę, a kafelek wydarzenia pokazuje, ile dni zostało. Odhaczenie jest jedyną akcją, którą trzeba zrozumieć, żeby zacząć.",
          "Obok warstwy użytkownika zaprojektowałam panel administracyjny: typy wydarzeń, zadania, użytkownicy i grupy. To on decyduje o tym, co produkt podpowie na starcie, więc wymagał tyle samo uwagi co sama aplikacja, mimo że nie widzi go żaden użytkownik.",
          "Całość stoi na design systemie zbudowanym pod ten produkt: typografia, kolory, formularze, tabele, kafelki, stany pustej listy. Dzięki niemu aplikacja i panel wyglądają jak jeden produkt, a nie dwa osobne.",
        ],
        images: [
          { src: "/planujemyto-app-event.webp", alt: "Zrzut ekranu widoku wydarzenia w aplikacji PlanujemyTo z listą zadań." },
          { src: "/planujemyto-app-login.webp", alt: "Zrzut ekranu logowania w aplikacji PlanujemyTo." },
          { src: "/planujemyto-app-system.webp", alt: "Zrzut ekranu panelu administracyjnego PlanujemyTo z zarządzaniem typami wydarzeń." },
          { src: "/planujemyto-app-components.webp", alt: "Zrzut ekranu komponentów design systemu PlanujemyTo." },
        ],
      },
    ],
    palette,
    closingLogo: { src: "/planujemyto-closing-logo.webp", alt: "Logotyp PlanujemyTo w bieli na fioletowym polu marki." },
    closingImage: { src: "/planujemyto-closing.webp", alt: "Znak PlanujemyTo na jednolitym polu w kolorze marki." },
  },
  en: {
    heroEyebrow: "BRAND & PRODUCT · PLANUJEMYTO",
    heroTags: projectTags.planujemyto,
    heroTitle: (
      <>
        <span style={{ color: "var(--pf-accent-500)" }}>PlanujemyTo</span>, together.
      </>
    ),
    heroLead:
      "PlanujemyTo is a free event-planning app: weddings, christenings, birthdays, eighteenths, trips. Instead of an empty list, the user picks an event type and the app suggests the tasks that kind of event always needs ticking off, each one with a date, a place and a note. I owned the whole visual and product side of this project: the brand, information architecture, flow, the app and admin panel interface, and the design system both of those are built on.",
    coverImages: [
      { src: "/planujemyto-cover-mark.webp", alt: "The PlanujemyTo mark, a checkbox joined with a balloon." },
      { src: "/planujemyto-cover-logo.webp", alt: "The full horizontal PlanujemyTo logo." },
      { src: "/planujemyto-cover-app.webp", alt: "Screenshot of the PlanujemyTo app." },
    ],
    sections: [
      {
        eyebrow: "01 · Brand",
        title: "Identity and mark system",
        paragraphs: [
          "The brand had to carry many different event types at once, from christenings to eighteenths, so it couldn't lean into any single one of them. I built it around a checkbox standing for a completed task and balloons, which turn up at most of these events. Together, the two symbols describe everything the product does, and combined into one shape they read as the heart of PlanujemyTo.",
          "The mark got the full set of uses the product actually needs: a horizontal lockup, a standalone symbol, mono versions for light and dark backgrounds, and an app icon in four colourways. The symbol is simple enough that it holds up all the way down to favicon size.",
        ],
        images: [
          { src: "/planujemyto-logo-lockup.webp", alt: "Horizontal lockup of the PlanujemyTo logo, checkbox joined with a balloon." },
          { src: "/planujemyto-idea.webp", alt: "Concept sketch showing how the checkbox and balloon combine into the PlanujemyTo mark." },
          { src: "/planujemyto-mono.webp", alt: "Two panels side by side showing the mono variants of the PlanujemyTo mark on light and dark backgrounds." },
          { src: "/planujemyto-icons.webp", alt: "Four colour variants of the PlanujemyTo app icon." },
        ],
      },
      {
        eyebrow: "02 · Colour",
        title: "Palette and colour hierarchy",
        paragraphs: [
          "The palette stands on one saturated violet and four supporting colours that stay a step behind it. Lavender carries backgrounds and highlights, a deep blue-violet holds the typography and the dark variants of the mark, and white and near black close off the contrast range.",
          "I kept violet strictly for action: buttons, active states, the symbol. In a product where a dozen-plus tasks, statuses and lists all live on screen at once, one reserved action colour does the job of showing where you can actually click.",
        ],
        images: [],
      },
      {
        eyebrow: "03 · Product",
        title: "The app and the admin panel, one system",
        paragraphs: [
          "The app carries one event from start to finish. The user picks a type, gets a suggested task list, and is working with specifics right away: every task has a date, a time, a place and a note, and the event tile shows how many days are left. Checking a task off is the only action you need to understand to get started.",
          "Alongside the user-facing layer, I designed the admin panel: event types, tasks, users and groups. It decides what the product suggests on day one, so it needed just as much attention as the app itself, even though no end user ever sees it.",
          "Both stand on a design system built for this product: typography, colours, forms, tables, tiles, empty-list states. It's what makes the app and the panel read as one product instead of two separate ones.",
        ],
        images: [
          { src: "/planujemyto-app-event.webp", alt: "Screenshot of the event view in the PlanujemyTo app with its task list." },
          { src: "/planujemyto-app-login.webp", alt: "Screenshot of the PlanujemyTo app login screen." },
          { src: "/planujemyto-app-system.webp", alt: "Screenshot of the PlanujemyTo admin panel managing event types." },
          { src: "/planujemyto-app-components.webp", alt: "Screenshot of the PlanujemyTo design system components." },
        ],
      },
    ],
    palette,
    closingLogo: { src: "/planujemyto-closing-logo.webp", alt: "The PlanujemyTo wordmark in white on the violet brand field." },
    closingImage: { src: "/planujemyto-closing.webp", alt: "The PlanujemyTo mark on a solid brand-colour field." },
  },
}
