import { useEffect } from "react"
import { Lightbulb } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { ContactCTA } from "@/components/ContactCTA"

const PRIMARY = "#DD8100"

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-medium tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-slate-100 my-0" />
}

export function BannerozaPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    setTimeout(() => { document.documentElement.style.scrollBehavior = "" }, 100)
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-32">

        {/* ── HERO ── */}
        <div className="py-16">
          <ProjectNav currentHref="/case-study/banneroza" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            Szyldowe Rewolucje — <br/>strona konkursu dla projektantów
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-6">
            Projekt koncepcyjny strony internetowej dla konkursu <strong className="text-slate-700">Szyldowe Rewolucje</strong> — inicjatywy walczącej z chaosem reklamowym w przestrzeni publicznej. Konkurs angażuje projektantów do tworzenia estetycznych, zgodnych z prawem szyldów dla lokalnych przedsiębiorców, a zwycięskie prace są realizowane w przestrzeni miejskiej. Projekt powstał w ramach studiów podyplomowych <strong className="text-slate-700">UX design | web analytics</strong> na Politechnice Białostockiej.
          </p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#FFF3E0" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: "#DD8100" }}>↗</span>
            <p style={{ color: "#6b3a00" }}>
              <strong className="font-semibold">Moja rola</strong> — Research, wywiady z użytkownikami, analiza, prototypowanie, wireframes, testy użyteczności. Projekt powstał w ramach studiów podyplomowych UX design | web analytics na Politechnice Białostockiej.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {[
              { label: "Produkt", value: "Szyldowe Rewolucje" },
              { label: "Typ", value: "Konkurs dla projektantów" },
              { label: "Narzędzia", value: "Adobe XD · Miro" },
              { label: "Zakres", value: "UI/UX · Web concept" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/banneroza/cover2.jpg" alt="Banneroza — okładka" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>01 — Problem & Challenge</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-8">Choroba bannerowa w przestrzeni miejskiej</h2>

          <p className="text-slate-500 leading-relaxed mb-6">
            Nielegalne i nieestetyczne reklamy zaśmiecają przestrzeń publiczną polskich miast. Samorządy walczą z tym zjawiskiem, ale zadanie jest trudne — wymaga podnoszenia świadomości mieszkańców i przedsiębiorców oraz wiąże się ze znacznymi kosztami.
          </p>
          <p className="text-slate-500 leading-relaxed mb-12">
            Pytanie projektowe: jak zachęcić lokalną społeczność (mieszkańców, przedsiębiorców, samorządy) do dbania o estetykę przestrzeni miejskiej i ułatwić proces zmiany otoczenia, w którym żyjemy?
          </p>

          <img src="/banneroza/1.jpg" alt="Problem — bannery w miastach" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SOLUTION ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>02 — Solution</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Szyldowe Rewolucje</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-slate-500 leading-relaxed mb-6">
                A competition for designers that has a real impact on the visual change of urban space. It is organized with the support of local governments that have already adopted a landscape resolution in their cities. The winning proposal does not end up in a drawer, but is realized in a city space.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Thanks to this, designers, in addition to receiving a cash prize, have an impact on the fight against banner disease, and local entrepreneurs receive professional, in accordance with the requirements of the law, spatial advertising.
              </p>
              <p className="text-slate-500 leading-relaxed">
                The project includes the preparation of the competition website.
              </p>
            </div>
            <img src="/banneroza/3.jpg" alt="Szyldowe Rewolucje — solution" className="w-full rounded-xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── DISCOVERY ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>03 — Discovery</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-8">Co pokazały badania</h2>

          <p className="text-slate-500 leading-relaxed mb-6">
            Na początku starałyśmy się zrozumieć rzeczywisty problem stojący za bannerami. W tym celu przeprowadziłyśmy desk research i stworzyłyśmy w zespole listę pytań badawczych.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8">
            Zdecydowałyśmy się przeprowadzić ankietę wśród mieszkańców miast (wszystkich grup wiekowych), aby poznać ich opinie. Żeby zebrać zdanie możliwie dużej grupy, zorganizowałyśmy badania ilościowe.
          </p>

          <div className="rounded-xl px-6 py-5 mb-12" style={{ background: "#FFF3E0" }}>
            <p className="text-[13px] font-medium tracking-widest uppercase mb-4" style={{ color: "#DD8100" }}>Pytania badawcze</p>
            <ul className="flex flex-col gap-2">
              {[
                "Jaki jest rzeczywisty problem z reklamami miejskimi?",
                "Jak duża jest świadomość społeczna? Co ludzie myślą o tym problemie?",
                "Kto i w jaki sposób podejmuje działania w celu rozwiązania problemu?",
                "Czy ktoś próbował już rozwiązać ten problem? Jakie były efekty?",
                "Czy informacje na bannerach są użyteczne?",
                "Gdzie reklamy są szczególnie uciążliwe?",
              ].map((q) => (
                <li key={q} className="flex gap-3 text-[15px]" style={{ color: "#6b3a00" }}>
                  <span style={{ color: PRIMARY }} className="flex-shrink-0 font-bold">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <img src="/banneroza/4.jpg" alt="Badania — dane ilościowe" className="w-full rounded-xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Kluczowe insighty</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Brak wiedzy o prawie krajobrazowym", desc: "Większość nie wie, że takie przepisy istnieją." },
              { title: "Problem ze zrozumieniem prawa", desc: "Ustawa jest zbyt skomplikowana do samodzielnej interpretacji." },
              { title: "Niska świadomość problemu", desc: "Chaos reklamowy traktowany jest jako norma, nie problem." },
              { title: "Brak zaangażowania", desc: "Świadomość problemu rzadko przekłada się na działanie." },
              { title: "Potrzeba wiarygodnego źródła", desc: "Inicjatywa musi być poparta autorytetem — np. Urzędu Miasta." },
              { title: "Potrzeba ilustrowanego przewodnika", desc: "Prosty, wizualny poradnik z wymogami prawnymi — to czego brakuje." },
            ].map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: PRIMARY }} className="mb-3" />
                <p className="font-semibold text-slate-900 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Persona</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            Na podstawie zebranych danych stworzyliśmy personę — żeby nie zapominać dla kogo projektujemy w trakcie całego procesu.
          </p>
          <img src="/banneroza/5.jpg" alt="Persona — Michał Grubiński" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROCES ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>04 — Proces</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-8">Od architektury informacji po wireframes</h2>

          <p className="text-slate-500 leading-relaxed mb-12">
            Na podstawie badań zaprojektowałyśmy architekturę informacji serwisu — obejmującą stronę główną, sekcję o konkursie, informator, galerię poprzednich edycji i formularz zgłoszeniowy. W pierwszej iteracji powstały low-fi wireframes, które pozwoliły zweryfikować założenia i wychwycić braki przed przejściem do high fidelity.
          </p>

          <img src="/banneroza/6.jpg" alt="Architektura informacji" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── DESIGN ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>05 — Design</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Low fidelity wireframes i High fidelity mockup</h2>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Low fidelity wireframes</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            W pierwszej iteracji stworzyłyśmy low-fi wireframes, żeby sprawdzić czy nasze założenia są możliwe do zrealizowania oraz wychwycić braki i elementy zbędne zanim przeszłyśmy do właściwego projektu.
          </p>
          <img src="/banneroza/7.jpg" alt="Low fidelity wireframes" className="w-full rounded-xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">High fidelity mockup</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            Finalny design oparłyśmy na żółto-czarnej palecie barw nawiązującej do sygnalizacji i oznaczeń miejskich. Celem było stworzenie strony czytelnej, minimalistycznej i dostępnej — zarówno na desktopie, jak i na urządzeniach mobilnych. Projekt uwzględnia stronę główną, informator o przepisach, galerię edycji, formularz zgłoszeniowy i ekran potwierdzenia.
          </p>
          <img src="/banneroza/8.jpg" alt="High fidelity mockup" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── WNIOSKI ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>06 — Czego się nauczyłam</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-4">Co bym zrobiła inaczej</h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            Testy użyteczności były dla mnie najbardziej wartościowym momentem projektu — obserwowanie jak prawdziwi użytkownicy wchodzą w interakcję z produktem weryfikuje założenia, które wydają się oczywiste w trakcie projektowania.
          </p>

          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 mb-12">
            {[
              { title: "Dostępność to nie opcja — to fundament", desc: "Wchodząc w projekt skupiałam się na estetyce i strukturze, a dostępność traktowałam jako późniejszy krok. Testy pokazały, że kontrast i wyrównanie tekstu realnie blokują użytkowników — nie tylko z niepełnosprawnościami. Następnym razem zaczynam od dostępności." },
              { title: "Język projektanta ≠ język użytkownika", desc: "Terminy, które dla mnie były oczywiste, użytkownicy interpretowali różnie. Nauczyłam się, że każdy komunikat wymaga testu — szczególnie w formularzach i procesach wielokrokowych." },
              { title: "Hierarchia informacji ważniejsza niż kompletność", desc: "Chciałam pokazać wszystko. Użytkownicy chcieli znaleźć jedno konkretne. Nauczyłam się projektować pod pytanie 'co użytkownik chce zobaczyć najpierw', nie 'co chcę mu pokazać'." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-400 leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>


        </div>

        <NextProject currentHref="/case-study/banneroza" />
        <ContactCTA />

      </div>
    </div>
  )
}
