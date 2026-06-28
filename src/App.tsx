import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-slate-400 border-t border-slate-100">
        © 2026 Edyta Suprun · Zaprojektowane z ♥
      </footer>
    </div>
  )
}
