import { Navbar } from "@/components/Navbar"
import { Contact } from "@/components/sections/Contact"
import { RaportyCaseStudyV1 } from "@/pages/RaportyCaseStudyV1"

/** The first version of the Raporty case study, kept for reference after the
 *  redesign. It is deliberately absent from data/projects.ts, so the gallery
 *  never links to it and no modal opens for it — this route is the only way in,
 *  which is why it carries its own Navbar and Contact instead of borrowing the
 *  homepage's. */
export function RaportyV1Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <RaportyCaseStudyV1 />
        <Contact />
      </main>
    </div>
  )
}
