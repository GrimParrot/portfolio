import { Navbar } from "@/components/Navbar"
import { HeroV2 } from "@/components/sections/HeroV2"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar dark />
      <main>
        <HeroV2 />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
