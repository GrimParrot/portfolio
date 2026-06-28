import { useEffect, useState } from "react"
import { ExternalLink, Lightbulb, TrendingDown, BarChart2, Video, Users, Headphones, Star } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { ContactCTA } from "@/components/ContactCTA"

function CrossfadeImage({ images, interval }: { images: string[]; interval: number }) {
  const [index, setIndex] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const positions = ["center", "top"]

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length
      setNext(nextIndex)
      setAnimating(false)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimating(true)
        setTimeout(() => {
          setIndex(nextIndex)
          setNext(null)
          setAnimating(false)
        }, 650)
      }))
    }, interval)
    return () => clearInterval(timer)
  }, [index, images.length, interval])

  const fromRight = next !== null && next % 2 === 1

  return (
    <div className="relative w-full rounded-xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
      {/* current — stoi w miejscu */}
      <img
        src={images[index]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: positions[index % positions.length], zIndex: 1 }}
      />
      {/* next — wjeżdża NA poprzedni */}
      {next !== null && (
        <img
          src={images[next]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: positions[next % positions.length],
            transform: animating ? "translateX(0)" : `translateX(${fromRight ? "100%" : "-100%"})`,
            transition: animating ? "transform 0.6s ease-in-out" : "none",
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}

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

function Metric({ value, sub, color }: { value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-6">
      <p className="text-5xl font-black" style={{ color }}>{value}</p>
      <p className="text-slate-400 leading-snug">{sub}</p>
    </div>
  )
}

function ScreenPlaceholder({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="bg-secondary border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 py-16 px-6 text-center">
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-slate-300">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
      <p className="font-medium text-slate-400">{label}</p>
      {sub && <p className="text-slate-300">{sub}</p>}
    </div>
  )
}

export function LocaloCaseStudy() {
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
          <ProjectNav currentHref="/case-study/localo" />
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            Unifying client prospecting — from two fragmented tools into{" "}
            <span className="font-black">one end-to-end flow</span>
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-8">
            Obie funkcje — generowanie leadów i research widoczności — istniały w Localo osobno, były trudne w obsłudze i wymagały osobistego onboardingu przez zespół. Sales mode dodatkowo zmuszał użytkowników do pracy w zewnętrznych narzędziach: CRM, arkuszach kalkulacyjnych. Zaprojektowałam <strong className="text-slate-700">Client Acquisition</strong> — jedno narzędzie z dwoma modułami, które działają jako spójne, samowyjaśniające się flow, bez konieczności wychodzenia do zewnętrznych aplikacji.
          </p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#EEF2FF" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: "#466AFA" }}>↗</span>
            <p style={{ color: "#466AFA" }}>
              <strong className="font-semibold">Moja rola</strong> — Lead Product Designer: od discovery do handoffu. Badania użytkowników, hipotezy, architektura flow, ekrany, testy użyteczności. Zespół: PM, QA, copywriter, dev.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {[
              { label: "Produkt", value: "Localo" },
              { label: "Skala", value: "5 000+ użytkowników" },
              { label: "Branża", value: "Local SEO / B2B SaaS" },
              { label: "Użytkownicy", value: "Agencje SEO i freelancerzy" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img
            src="/Sales mode.png"
            alt="Client Acquisition — główny widok"
            className="w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>

        <Divider />

        {/* ── 01 CONTEXT ── */}
        <div className="py-14">
          <Tag color="#466AFA">01 — Efekty</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-4">Co się zmieniło po wdrożeniu</h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            <strong className="text-slate-700">Dwa osobne narzędzia</strong> — Research mode i Sales mode — zostały zastąpione <strong className="text-slate-700">jednym spójnym flow</strong> z dwoma modułami: Leads Finder i Visibility Scans. Użytkownik <strong className="text-slate-700">nie przeskakuje między trybami</strong>: wynik z jednego modułu naturalnie prowadzi do drugiego. Narzędzie jest <strong className="text-slate-700">samowyjaśniające się</strong> i nie wymaga zewnętrznych aplikacji do dokończenia zadania.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Metric value="↑ TBD" sub="[Nazwa metryki, np. task completion rate]" color="#1D9E75" />
            <Metric value="−28%" sub="[Np. czas do pierwszego sukcesu]" color="#1D9E75" />
            <Metric value="4.6 / 5" sub="[Np. ocena w badaniu satysfakcji]" color="#466AFA" />
          </div>

          <div className="mt-12 mb-12 pl-6 border-l-2 border-slate-200">
            <p className="text-slate-700 leading-relaxed italic">
              „Cytat od użytkownika lub stakeholdera po wdrożeniu — najlepiej konkrety, nie ogólniki."
            </p>
            <p className="text-[13px] text-slate-400 mt-3">— Rola / kontekst</p>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Funkcja weszła w skład wszystkich planów <strong className="text-slate-700">Pro i Enterprise</strong>, zwiększając postrzeganą wartość wyższych tierów i przekładając się na <strong className="text-slate-700">niższy churn</strong> wśród agencji obsługujących wielu klientów. Mierzyliśmy adopcję nowej funkcji oraz pośredni wpływ na <strong className="text-slate-700">wzrost liczby zarządzanych profili</strong> — kluczową metrykę dla przychodu platformy.
          </p>
        </div>

        <Divider />

        {/* ── 03 DISCOVERY ── */}
        <div className="py-14">
          <Tag color="#466AFA">02 — Discovery</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Co pokazały badania</h2>

          <p className="font-light text-[#0F172A] mt-4 mb-12 pl-6 border-l-4" style={{ fontSize: "32px", lineHeight: 1.4, borderColor: "#466AFA" }}>
            Choć funkcje są dostępne, ich złożoność wymusza{" "}
            <span className="font-black" style={{ color: "#466AFA" }}>ręczny onboarding</span>{" "}
            i wypycha użytkowników do{" "}
            <span className="font-black" style={{ color: "#466AFA" }}>narzędzi zewnętrznych</span>.{" "}
            Efekt: stracony czas, brak rezultatów i{" "}
            <span className="font-black" style={{ color: "#466AFA" }}>wysoki próg wejścia</span>{" "}
            ograniczający adopcję.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Kluczowe insighty</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: "Brak ciągłości między modułami",
                desc: "Leady były w Sales mode, dane o widoczności — w Research. Między trybami nie przechodził żaden kontekst.",
              },
              {
                n: "2",
                title: "Zewnętrzne narzędzia jako obejście",
                desc: "Statusy leadów — w arkuszu. Mapy Pozycji — w innej części produktu. Żeby dokończyć jedno zadanie, trzeba było wyjść z narzędzia kilka razy.",
              },
              {
                n: "3",
                title: "Wysoka bariera wejścia bez wsparcia zespołu",
                desc: "Każdy nowy użytkownik potrzebował osobistego onboardingu od CS. Interfejs nie tłumaczył wartości ani kolejnych kroków samodzielnie.",
              },
            ].map((item) => (
              <div key={item.n} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: "#F97316" }} />
                <p className="font-semibold text-slate-900 mt-3 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Tag>Metody badawcze</Tag>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                { label: "Analiza ścieżek · funnel drop-off", icon: <TrendingDown className="w-3.5 h-3.5" /> },
                { label: "Dane ilościowe", icon: <BarChart2 className="w-3.5 h-3.5" /> },
                { label: "Nagrania sesji (Clarity)", icon: <Video className="w-3.5 h-3.5" /> },
                { label: "Wywiady z użytkownikami", icon: <Users className="w-3.5 h-3.5" /> },
                { label: "Dane z supportu", icon: <Headphones className="w-3.5 h-3.5" /> },
                { label: "Feedback Customer Success", icon: <Star className="w-3.5 h-3.5" /> },
              ].map((m) => (
                <span key={m.label} className="flex items-center gap-1.5 text-slate-600 border border-slate-200 rounded-full px-3 py-1.5 [&>svg]:text-[#466AFA]">
                  {m.icon}{m.label}
                </span>
              ))}
            </div>
          </div>

        </div>

        <Divider />

        {/* ── 04 PROCESS ── */}
        <div className="py-14">
          <Tag color="#466AFA">03 — Proces</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Od eksploracji do finalnego rozwiązania</h2>

          <div className="mb-12">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Cele i zakres projektu</h3>

            <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-8" style={{ background: "#EEF2FF" }}>
              <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: "#466AFA" }}>↗</span>
              <p style={{ color: "#466AFA" }}>
                <strong className="font-semibold">Cel projektu</strong> — Obniżenie bariery wejścia, eliminacja zewnętrznych narzędzi i zwiększenie skuteczności prospectingu — tak, żeby użytkownik mógł samodzielnie zrozumieć wartość funkcji, wdrożyć je i realnie przełożyć na deale.
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-6">
              Przed przystąpieniem do projektowania ustaliłam z PM i zespołem precyzyjny cel i zakres. Wyznaczyłam, co wchodzi do tego projektu (ujednolicone flow, mini-CRM, Visibility Scans przy leadzie, onboarding kontekstowy), a co pozostaje poza scopem (np. zmiany w sposobie dodawania keywordów w Visibility Scans, integracje zewnętrzne). Jasno zdefiniowany scope pozwolił uniknąć scope creepu i skupić się na tym, co naprawdę przesuwa igłę.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "W scope", items: ["Ujednolicone flow Leads Finder + Visibility Scans", "Mini-CRM: statusy, komentarze, historia list", "Onboarding kontekstowy — tooltips, przykłady użycia", "System kredytowy i komunikacja limitów", "Połączenie między modułami bez utraty kontekstu"] },
                { label: "Poza scope", items: ["Zmiany w sposobie dodawania keywordów w VS", "Integracje z zewnętrznymi CRM-ami", "Nowe modele płatności", "Redesign pozostałych sekcji produktu"] },
              ].map((col) => (
                <div key={col.label} className="border border-slate-200 rounded-xl p-5">
                  <p className="text-[13px] font-medium tracking-widest uppercase text-slate-400 mb-3">{col.label}</p>
                  <ul className="flex flex-col gap-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2 text-slate-500 text-[15px]">
                        <span style={{ color: col.label === "W scope" ? "#466AFA" : "#94a3b8" }} className="flex-shrink-0">{col.label === "W scope" ? "✓" : "✕"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Architektura flow</h3>
              <p className="text-slate-500 leading-relaxed">
                Zmapowałam oba istniejące flow — Research i Sales — żeby zobaczyć gdzie się przecinają, gdzie użytkownik traci kontekst i gdzie leży luka. Okazało się, że oba pokrywały częściowo ten sam obszar, ale żadne nie domykało go w całości. To stało się podstawą do zaprojektowania nowej, połączonej architektury.
              </p>
            </div>
            <img src="/flow.png" alt="User flow — Client Acquisition" className="w-full rounded-xl border border-slate-200" />
          </div>

          <img src="/summary.png" alt="Synteza badań" className="w-full rounded-xl border border-slate-200" />
          <div className="mt-6 mb-12">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Synteza badań</h3>
            <p className="text-slate-500 leading-relaxed">
              Połączyłam wnioski z nagrań sesji w Clarity, rozmów z supportem i wywiadów z użytkownikami. Wyodrębniłam największe pain pointy i powtarzające się wzorce zachowań, a następnie zmapowałam je na potencjalne kierunki projektowe — tak żeby decyzje o zakresie były zakorzenione w danych, nie w intuicji.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <img src="/low-fi list.png" alt="Lo-fi — lista leadów" className="w-full rounded-xl border border-slate-200" />
              <p className="text-slate-400 mt-3 leading-relaxed">
                Wczesne eksploracje układu informacji — jak pokazać Growth Potential, status i akcje bez przeciążenia kognitywnego.
              </p>
            </div>
            <div>
              <ScreenPlaceholder label="SCREEN — Mid-fi po usability test" sub="Iteracja po testach z użytkownikami" />
              <p className="text-slate-400 mt-3 leading-relaxed">
                Kluczowa iteracja po testach użyteczności: [uzupełnij co nie działało i co zmieniłaś].
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 05 SOLUTION ── */}
        <div className="py-14">
          <Tag color="#466AFA">04 — Rozwiązanie</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-6">Jeden flow — od odkrycia do onboardingu</h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            Użytkownik zaczyna od Leads Finder — szuka firm w danej niszy i lokalizacji, buduje listę potencjalnych klientów. Gdy znajdzie interesującego leada, uruchamia Visibility Scan i sprawdza jego widoczność online. Wynik staje się konkretnym argumentem sprzedażowym i gotowym kontekstem do oferty lub cold maila. Cały proces — od pierwszego wyszukiwania do aktywacji klienta — w jednym miejscu.
          </p>


          {[
            {
              step: "01",
              title: "Generowanie listy leadów",
              desc: "Użytkownik wpisuje kategorię i lokalizację. System zwraca ~90 profili Google Business z kluczowymi danymi: brak WWW, liczba opinii, link do map. Kluczowa decyzja projektowa: żadnego pustego stanu — wynik natychmiast, bez konfiguracji i onboardingu.",
              img: "/modal.png",
              imgAlt: "Modal — generowanie listy leadów",
              reverse: false,
              fullWidth: true,
            },
            {
              step: "02",
              title: "Growth Potential — jeden wskaźnik zamiast surowych danych",
              desc: "Zamiast 6 metryk do samodzielnej analizy — jeden zagregowany scoring. \"Hot lead\" (brak WWW + mało opinii) albo \"big opportunity\" widoczne od razu. Wyższy wynik = łatwiejszy klient do domknięcia i szybsze rezultaty. Zdjęłam z użytkownika obowiązek kalkulacji.",
              img: "/growth potential.png",
              imgAlt: "Growth Potential score",
              reverse: true,
            },
            {
              step: "03",
              title: "Skan widoczności — kontekst przestrzenny leada",
              desc: "Jednym kliknięciem z poziomu leada użytkownik odpala Visibility Scan — sprawdza jak ta firma wypada pod kątem widoczności online. Wynik wraca jako gotowy argument sprzedażowy: konkretne słowa kluczowe, na których firma jest niewidoczna — materiał do rozmowy i cold maila.",
              img: "/pin map.png",
              imgAlt: "Visibility Scan — mapa z pinami",
              reverse: false,
            },
            {
              step: "04",
              title: "Zarządzanie statusem leadów",
              desc: "Mini-CRM wbudowany bezpośrednio w produkt: statusy kontaktów, kanban, komentarze, historia i snapshot list. Użytkownik nie musi wychodzić do arkusza — wszystko w jednym miejscu. Bezpośrednia odpowiedź na spreadsheet jako równoległy system.",
              img: "/status.png",
              imgAlt: "Status leadów i komentarze",
              reverse: true,
            },
            {
              step: "05",
              title: "Pogłębiona analiza — kolejne Visibility Scans",
              desc: "Użytkownik może generować kolejne skany dla dodatkowych słów kluczowych — każdy wynik wzbogaca kontekst oferty. Dane z Visibility Scans wracają bezpośrednio do profilu leada: wynik skanu, słabe keywordy, pozycja na tle konkurencji. Gotowy materiał do rozmowy, bez ręcznego przepisywania.",
              img: "/visibility scans.png",
              imgAlt: "Visibility Scans",
              reverse: false,
              fullWidthTextTop: true,
            },
            {
              step: "06",
              title: "Aktywacja klienta — onboarding w jednym kliknięciu",
              desc: "Kiedy klient mówi tak — aktywacja profilu jednym kliknięciem, bez wychodzenia z widoku i bez ręcznego przepisywania danych. Zamknięcie pełnej pętli akwizycji w tym samym narzędziu: od leada do pierwszego dnia współpracy.",
              img: "/confirm activation.png",
              imgAlt: "Aktywacja profilu",
              reverse: false,
              contain: true,
            },
          ].map((feature, i) => (
            "fullWidthTextTop" in feature && feature.fullWidthTextTop ? (
              <div key={i} className="mb-16">
                <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: "#466AFA" }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{feature.desc}</p>
                {"img" in feature && feature.img ? (
                  <img src={feature.img} alt={feature.title} className="w-full rounded-xl border border-slate-200 object-cover" />
                ) : (
                  <ScreenPlaceholder label={(feature as {placeholder: {label: string}}).placeholder.label} />
                )}
              </div>
            ) : "fullWidth" in feature && feature.fullWidth ? (
              <div key={i} className="mb-16">
                <CrossfadeImage images={["/modal.png", "/lead list.png"]} interval={2000} />
                <span className="text-[13px] font-medium tracking-widest uppercase mt-8 mb-2 block" style={{ color: "#466AFA" }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ) : (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${feature.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: "#466AFA" }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
              {"img" in feature && feature.img ? (
                <img src={feature.img} alt={feature.imgAlt} className={`w-full rounded-xl border border-slate-200 ${"contain" in feature && feature.contain ? "object-contain bg-secondary" : "object-cover"}`} style={"contain" in feature && feature.contain ? { aspectRatio: "4/3" } : { aspectRatio: "16/9" }} />
              ) : (
                <ScreenPlaceholder label={(feature as {placeholder: {label: string}}).placeholder.label} />
              )}
            </div>
            )
          ))}

          {/* Rejected */}
          <div className="border-t border-slate-100 pt-8">
            <Tag color="#64748b">Odrzucone kierunki</Tag>
            <div className="flex flex-col gap-3 mt-4">
              {[
                { title: "Research + Sales jako osobne tryby", reason: "logicznie czyste, ale wymuszało mentalne przełączanie; użytkownik szuka i sprzedaje jednocześnie, nie sekwencyjnie" },
                { title: "Surowe metryki zamiast Growth Potential score", reason: "przerzucało na użytkownika obliczenie \"czy warto\", wymagało wiedzy eksperckiej" },
                { title: "Position Map w osobnej sekcji produktu", reason: "przerywało flow i powodowało drop-off; użytkownicy nie wracali do listy leadów" },
                { title: "Widok listy projektów w Leads Finder", reason: "użytkownicy łatwiej nawigowali między kampaniami w widoku kafli niż na liście" },
              ].map((r) => (
                <div key={r.title} className="flex gap-3 items-start bg-red-50 rounded-lg px-6 py-5">
                  <span className="text-red-400 font-medium flex-shrink-0">✕</span>
                  <p className="text-red-900 text-[15px]">
                    <strong className="font-semibold">{r.title}</strong> — {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── REFLECTION ── */}
        <div className="py-14">
          <Tag color="#466AFA">05 — Czego się nauczyłam</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-4">Co bym zrobiła inaczej</h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            Projekt był złożony — dwa moduły, system kredytowy, onboarding kontekstowy i migracja danych w jednym zakresie. Kilka rzeczy zrobiłabym dziś inaczej.
          </p>
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
            {[
              {
                title: "Przetestować Growth Potential score wcześniej",
                desc: "Algorytm jest kluczowy dla decyzji użytkownika — scoring decyduje o tym, czy ktoś w ogóle zaczyna rozmowę sprzedażową. Chciałabym więcej iteracji na samej formule zanim weszła do produktu, a nie po.",
              },
              {
                title: "Migracja legacy danych wymaga własnego projektu",
                desc: "Przejście z Research + Sales mode okazało się bardziej złożone niż zakładałam na kickoffie. Migracja powinna być traktowana jako osobny projekt z własnym zakresem i timeline'em — nie jako zadanie techniczne \"na koniec\".",
              },
              {
                title: "System kredytowy warto zaprojektować wcześniej w procesie",
                desc: "Komunikacja limitów, upsell w kontekście i progress bar kredytów — to nie są detale UI, to kluczowe decyzje produktowe. Następnym razem zaczynam od nich, nie kończę.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className={`font-semibold mb-1 ${i === 2 ? "text-slate-300" : "text-slate-900"}`}>{item.title}</p>
                  <p className={`leading-relaxed text-[15px] ${i === 2 ? "text-slate-300 italic" : "text-slate-400"}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <NextProject currentHref="/case-study/localo" />
        <ContactCTA />

      </div>
    </div>
  )
}
