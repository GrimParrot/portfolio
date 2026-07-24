import { Navbar } from "@/components/Navbar"
import { CurvedMarquee } from "@/components/CurvedMarquee"

export function MarqueeLab() {
  return (
    <>
      <Navbar dark />
      <div id="hero-dark" className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-32">
        <CurvedMarquee
          text="Strategia produktowa • Badania • Prototypowanie • "
          pathType="wave"
          amplitude={40}
          wavelength={420}
          speed={90}
          reversed
          fontSize={40}
          color="#FFFFFF"
        />
      </div>
    </>
  )
}
