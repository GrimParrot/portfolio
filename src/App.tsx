import { Navbar } from "@/components/Navbar"
import { HeroV2 } from "@/components/sections/HeroV2"
import { SkillsMarquee } from "@/components/sections/SkillsMarquee"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar dark />
      <main>
        <div id="hero-dark">
          <HeroV2 />
          <SkillsMarquee />
        </div>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
