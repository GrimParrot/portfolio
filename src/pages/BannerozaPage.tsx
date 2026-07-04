import { Lightbulb } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"

const PRIMARY = "#DD8100"

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-bold tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-slate-100 my-0" />
}

const copy = {
  pl: {
    h1: "Szyldowe Rewolucje — strona konkursu dla projektantów",
    body: <>Projekt koncepcyjny strony internetowej dla konkursu <strong className="text-slate-700">Szyldowe Rewolucje</strong> — inicjatywy walczącej z chaosem reklamowym w przestrzeni publicznej. Konkurs angażuje projektantów do tworzenia estetycznych, zgodnych z prawem szyldów dla lokalnych przedsiębiorców, a zwycięskie prace są realizowane w przestrzeni miejskiej. Projekt powstał w ramach studiów podyplomowych <strong className="text-slate-700">UX design | web analytics</strong> na Politechnice Białostockiej.</>,
    roleLabel: "Moja rola",
    roleText: "Research, wywiady z użytkownikami, analiza, prototypowanie, wireframes, testy użyteczności. Projekt powstał w ramach studiów podyplomowych UX design | web analytics na Politechnice Białostockiej.",
    meta: [
      { label: "Produkt", value: "Szyldowe Rewolucje" },
      { label: "Typ", value: "Konkurs dla projektantów" },
      { label: "Narzędzia", value: "Adobe XD · Miro" },
      { label: "Zakres", value: "UI/UX · Web concept" },
    ],
    s01: {
      tag: "01 — Problem & Challenge",
      h2: "Choroba bannerowa w przestrzeni miejskiej",
      p1: "Nielegalne i nieestetyczne reklamy zaśmiecają przestrzeń publiczną polskich miast. Samorządy walczą z tym zjawiskiem, ale zadanie jest trudne — wymaga podnoszenia świadomości mieszkańców i przedsiębiorców oraz wiąże się ze znacznymi kosztami.",
      p2: "Pytanie projektowe: jak zachęcić lokalną społeczność (mieszkańców, przedsiębiorców, samorządy) do dbania o estetykę przestrzeni miejskiej i ułatwić proces zmiany otoczenia, w którym żyjemy?",
    },
    s02: {
      tag: "02 — Solution",
      h2: "Szyldowe Rewolucje",
      p1: "Konkurs dla projektantów, który ma realny wpływ na wizualną zmianę przestrzeni miejskiej. Organizowany jest przy wsparciu samorządów, które uchwaliły już uchwałę krajobrazową w swoich miastach. Zwycięski projekt nie ląduje w szufladzie, lecz jest realizowany w przestrzeni miejskiej.",
      p2: "Dzięki temu projektanci, oprócz nagrody pieniężnej, mają wpływ na walkę z chorobą bannerową, a lokalni przedsiębiorcy otrzymują profesjonalne, zgodne z wymogami prawa, reklamy przestrzenne.",
      p3: "Projekt obejmuje przygotowanie strony internetowej konkursu.",
    },
    s03: {
      tag: "03 — Discovery",
      h2: "Co pokazały badania",
      p1: "Na początku starałyśmy się zrozumieć rzeczywisty problem stojący za bannerami. W tym celu przeprowadziłyśmy desk research i stworzyłyśmy w zespole listę pytań badawczych.",
      p2: "Zdecydowałyśmy się przeprowadzić ankietę wśród mieszkańców miast (wszystkich grup wiekowych), aby poznać ich opinie. Żeby zebrać zdanie możliwie dużej grupy, zorganizowałyśmy badania ilościowe.",
      questionsLabel: "Pytania badawcze",
      questions: [
        "Jaki jest rzeczywisty problem z reklamami miejskimi?",
        "Jak duża jest świadomość społeczna? Co ludzie myślą o tym problemie?",
        "Kto i w jaki sposób podejmuje działania w celu rozwiązania problemu?",
        "Czy ktoś próbował już rozwiązać ten problem? Jakie były efekty?",
        "Czy informacje na bannerach są użyteczne?",
        "Gdzie reklamy są szczególnie uciążliwe?",
      ],
      insightsH3: "Kluczowe insighty",
      insights: [
        { title: "Brak wiedzy o prawie krajobrazowym", desc: "Większość nie wie, że takie przepisy istnieją." },
        { title: "Problem ze zrozumieniem prawa", desc: "Ustawa jest zbyt skomplikowana do samodzielnej interpretacji." },
        { title: "Niska świadomość problemu", desc: "Chaos reklamowy traktowany jest jako norma, nie problem." },
        { title: "Brak zaangażowania", desc: "Świadomość problemu rzadko przekłada się na działanie." },
        { title: "Potrzeba wiarygodnego źródła", desc: "Inicjatywa musi być poparta autorytetem — np. Urzędu Miasta." },
        { title: "Potrzeba ilustrowanego przewodnika", desc: "Prosty, wizualny poradnik z wymogami prawnymi — to czego brakuje." },
      ],
      personaH3: "Persona",
      personaDesc: "Na podstawie zebranych danych stworzyliśmy personę — żeby nie zapominać dla kogo projektujemy w trakcie całego procesu.",
    },
    s04: {
      tag: "04 — Proces",
      h2: "Od architektury informacji po wireframes",
      p: "Na podstawie badań zaprojektowałyśmy architekturę informacji serwisu — obejmującą stronę główną, sekcję o konkursie, informator, galerię poprzednich edycji i formularz zgłoszeniowy. W pierwszej iteracji powstały low-fi wireframes, które pozwoliły zweryfikować założenia i wychwycić braki przed przejściem do high fidelity.",
    },
    s05: {
      tag: "05 — Design",
      h2: "Low fidelity wireframes i High fidelity mockup",
      lofiH3: "Low fidelity wireframes",
      lofiP: "W pierwszej iteracji stworzyłyśmy low-fi wireframes, żeby sprawdzić czy nasze założenia są możliwe do zrealizowania oraz wychwycić braki i elementy zbędne zanim przeszłyśmy do właściwego projektu.",
      hifiH3: "High fidelity mockup",
      hifiP: "Finalny design oparłyśmy na żółto-czarnej palecie barw nawiązującej do sygnalizacji i oznaczeń miejskich. Celem było stworzenie strony czytelnej, minimalistycznej i dostępnej — zarówno na desktopie, jak i na urządzeniach mobilnych. Projekt uwzględnia stronę główną, informator o przepisach, galerię edycji, formularz zgłoszeniowy i ekran potwierdzenia.",
    },
    s06: {
      tag: "06 — Czego się nauczyłam",
      h2: "Co bym zrobiła inaczej",
      intro: "Testy użyteczności były dla mnie najbardziej wartościowym momentem projektu — obserwowanie jak prawdziwi użytkownicy wchodzą w interakcję z produktem weryfikuje założenia, które wydają się oczywiste w trakcie projektowania.",
      items: [
        { title: "Dostępność to nie opcja — to fundament", desc: "Wchodząc w projekt skupiałam się na estetyce i strukturze, a dostępność traktowałam jako późniejszy krok. Testy pokazały, że kontrast i wyrównanie tekstu realnie blokują użytkowników — nie tylko z niepełnosprawnościami. Następnym razem zaczynam od dostępności." },
        { title: "Język projektanta ≠ język użytkownika", desc: "Terminy, które dla mnie były oczywiste, użytkownicy interpretowali różnie. Nauczyłam się, że każdy komunikat wymaga testu — szczególnie w formularzach i procesach wielokrokowych." },
        { title: "Hierarchia informacji ważniejsza niż kompletność", desc: "Chciałam pokazać wszystko. Użytkownicy chcieli znaleźć jedno konkretne. Nauczyłam się projektować pod pytanie 'co użytkownik chce zobaczyć najpierw', nie 'co chcę mu pokazać'." },
      ],
    },
  },
  en: {
    h1: "Banner Revolution — competition website for designers",
    body: <>A conceptual website project for the <strong className="text-slate-700">Szyldowe Rewolucje</strong> competition — an initiative fighting advertising chaos in public space. The competition engages designers to create aesthetic, legally compliant signage for local businesses, with winning designs realized in urban space. The project was created as part of postgraduate studies in <strong className="text-slate-700">UX design | web analytics</strong> at the Białystok University of Technology.</>,
    roleLabel: "My role",
    roleText: "Research, user interviews, analysis, prototyping, wireframes, usability tests. Project created as part of postgraduate studies in UX design | web analytics at Białystok University of Technology.",
    meta: [
      { label: "Product", value: "Szyldowe Rewolucje" },
      { label: "Type", value: "Designer competition" },
      { label: "Tools", value: "Adobe XD · Miro" },
      { label: "Scope", value: "UI/UX · Web concept" },
    ],
    s01: {
      tag: "01 — Problem & Challenge",
      h2: "Banner disease in urban space",
      p1: "Illegal and unaesthetic advertising pollutes public spaces in Polish cities. Local governments fight this, but the task is difficult — it requires raising awareness among residents and businesses, and involves significant costs.",
      p2: "Design question: how to encourage the local community (residents, businesses, local governments) to care about the aesthetics of urban space and make it easier to change the environment we live in?",
    },
    s02: {
      tag: "02 — Solution",
      h2: "Szyldowe Rewolucje",
      p1: "A competition for designers with a real impact on the visual change of urban space. Organized with the support of local governments that have already adopted a landscape resolution. The winning design isn't shelved — it's realized in urban space.",
      p2: "This gives designers a cash prize plus real impact on fighting banner disease, while local businesses receive professional, legally compliant outdoor advertising.",
      p3: "The project includes designing the competition website.",
    },
    s03: {
      tag: "03 — Discovery",
      h2: "What the research revealed",
      p1: "First, we tried to understand the real problem behind the banners. We conducted desk research and created a list of research questions as a team.",
      p2: "We decided to survey city residents (all age groups) to gather their opinions. To reach as large a group as possible, we ran quantitative research.",
      questionsLabel: "Research questions",
      questions: [
        "What is the real problem with urban advertising?",
        "How widespread is social awareness? What do people think about this problem?",
        "Who takes action to solve the problem, and how?",
        "Has anyone already tried to solve this problem? What were the results?",
        "Are the messages on banners useful?",
        "Where are advertisements particularly problematic?",
      ],
      insightsH3: "Key insights",
      insights: [
        { title: "Lack of knowledge about landscape law", desc: "Most people don't know such regulations exist." },
        { title: "Difficulty understanding the law", desc: "The act is too complex to interpret independently." },
        { title: "Low problem awareness", desc: "Advertising chaos is treated as normal, not a problem." },
        { title: "Lack of engagement", desc: "Awareness of the problem rarely translates into action." },
        { title: "Need for a credible source", desc: "The initiative must be backed by authority — e.g. the City Office." },
        { title: "Need for an illustrated guide", desc: "A simple, visual guide with legal requirements — that's what's missing." },
      ],
      personaH3: "Persona",
      personaDesc: "Based on the data collected, we created a persona — to keep in mind who we're designing for throughout the process.",
    },
    s04: {
      tag: "04 — Process",
      h2: "From information architecture to wireframes",
      p: "Based on the research, we designed the site's information architecture — covering the homepage, competition section, guide, gallery of previous editions and submission form. In the first iteration, low-fi wireframes were created, allowing us to verify assumptions and catch gaps before moving to high fidelity.",
    },
    s05: {
      tag: "05 — Design",
      h2: "Low fidelity wireframes and High fidelity mockup",
      lofiH3: "Low fidelity wireframes",
      lofiP: "In the first iteration we created low-fi wireframes to check whether our assumptions were achievable and to catch gaps and redundant elements before moving to the actual design.",
      hifiH3: "High fidelity mockup",
      hifiP: "The final design was based on a yellow-black color palette referencing urban signage and markings. The goal was to create a readable, minimalist and accessible site — on both desktop and mobile. The design covers the homepage, legal requirements guide, edition gallery, submission form and confirmation screen.",
    },
    s06: {
      tag: "06 — What I learned",
      h2: "What I would do differently",
      intro: "Usability tests were the most valuable moment of the project — watching real users interact with the product verifies assumptions that seem obvious during design.",
      items: [
        { title: "Accessibility is not optional — it's foundational", desc: "Entering the project I focused on aesthetics and structure, treating accessibility as a later step. Tests showed that contrast and text alignment genuinely block users — not just those with disabilities. Next time, I start with accessibility." },
        { title: "Designer language ≠ user language", desc: "Terms that were obvious to me, users interpreted differently. I learned that every piece of communication needs testing — especially in forms and multi-step processes." },
        { title: "Information hierarchy over completeness", desc: "I wanted to show everything. Users wanted to find one specific thing. I learned to design around the question 'what does the user want to see first', not 'what do I want to show them'." },
      ],
    },
  },
}

export function BannerozaPage() {
  const { lang } = useLang()
  const t = copy[lang]


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/banneroza" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            {t.h1}
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0ABA53] text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-6">{t.body}</p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#FFF3E0" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
            <p style={{ color: "#6b3a00" }}>
              <strong className="font-semibold">{t.roleLabel}</strong> — {t.roleText}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {t.meta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/banneroza/cover2.jpg" alt="Banneroza — cover" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s01.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-6">{t.s01.p1}</p>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s01.p2}</p>
          <img src="/banneroza/1.jpg" alt="Problem — banners in cities" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SOLUTION ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p1}</p>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p2}</p>
              <p className="text-slate-500 leading-relaxed">{t.s02.p3}</p>
            </div>
            <img src="/banneroza/3.jpg" alt="Szyldowe Rewolucje — solution" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── DISCOVERY ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s03.h2}</h2>

          <p className="text-slate-500 leading-relaxed mb-6">{t.s03.p1}</p>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s03.p2}</p>

          <div className="rounded-xl px-6 py-5 mb-12" style={{ background: "#FFF3E0" }}>
            <p className="text-[13px] font-medium tracking-widest uppercase mb-4" style={{ color: PRIMARY }}>{t.s03.questionsLabel}</p>
            <ul className="flex flex-col gap-2">
              {t.s03.questions.map((q) => (
                <li key={q} className="flex gap-3 text-[15px]" style={{ color: "#6b3a00" }}>
                  <span style={{ color: PRIMARY }} className="flex-shrink-0 font-bold">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <img src="/banneroza/4.jpg" alt="Research — quantitative data" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.insightsH3}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.s03.insights.map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: PRIMARY }} className="mb-3" />
                <p className="font-semibold text-slate-900 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.personaH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s03.personaDesc}</p>
          <img src="/banneroza/5.jpg" alt="Persona" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROCES ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s04.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s04.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s04.p}</p>
          <img src="/banneroza/6.jpg" alt="Information architecture" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── DESIGN ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s05.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s05.h2}</h2>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.lofiH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s05.lofiP}</p>
          <img src="/banneroza/7.jpg" alt="Low fidelity wireframes" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.hifiH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s05.hifiP}</p>
          <img src="/banneroza/8.jpg" alt="High fidelity mockup" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── WNIOSKI ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s06.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-4">{t.s06.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s06.intro}</p>

          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 mb-12">
            {t.s06.items.map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NextProject currentHref="/case-study/banneroza" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
