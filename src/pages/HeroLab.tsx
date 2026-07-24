import { Navbar } from "@/components/Navbar"
import { HeroV2 } from "@/components/sections/HeroV2"
import { SkillsMarquee } from "@/components/sections/SkillsMarquee"

export function HeroLab() {
  return (
    <>
      <Navbar dark />
      <div id="hero-dark">
        <HeroV2 />
        <SkillsMarquee />
      </div>
    </>
  )
}
