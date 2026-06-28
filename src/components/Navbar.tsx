import { Button } from "@/components/ui/button"
import { Link, useNavigate, useLocation } from "react-router-dom"

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === "/") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" })
    } else {
      navigate("/")
      setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }), 300)
    }
  }

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      navigate("/")
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 300)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-slate-900 text-lg tracking-tight">
          Edyta<span className="text-violet-500">.</span>Suprun
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a
            href="#projects"
            onClick={handleProjects}
            className="hover:text-violet-600 transition-colors cursor-pointer"
          >Projekty</a>
          <a href="/cv" className="hover:text-violet-600 transition-colors">CV</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors">LinkedIn</a>
          <Button size="sm" className="bg-[#0F172A] hover:bg-[#1E293B]" onClick={handleContact}>
            Kontakt
          </Button>
        </div>
      </div>
    </nav>
  )
}
