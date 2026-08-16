import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"

/** Back to the project grid on the homepage.
 *
 * Four case-study pages carried byte-identical copies of this markup before it
 * was pulled out here, so any change to it meant four edits. It goes through
 * the Button primitive rather than hand-rolled classes: secondary + icon is
 * already exactly this shape, and it brings a focus ring the copies lacked.
 *
 * The scroll is deferred a tick because the homepage has to mount before
 * #projects exists to scroll to. */
export function BackToPortfolio({ className }: { className?: string }) {
  const { lang } = useLang()

  return (
    <Button asChild variant="secondary" size="icon" className={className}>
      <Link
        to="/"
        onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
        aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
      >
        <ArrowLeft className="w-4 h-4 animate-bounce-left" />
      </Link>
    </Button>
  )
}
