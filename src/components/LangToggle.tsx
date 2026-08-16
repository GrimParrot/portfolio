import { Fragment } from "react"
import { useLang } from "@/i18n/LanguageContext"
import { cn } from "@/lib/utils"

const LANGS = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
] as const

const GROUP_LABEL = { pl: "Wybór języka", en: "Language" }

/** PL / EN switch.
 *
 * The navbar carried two copies of this with different palettes — the desktop
 * one active in pf-700, the mobile one in pf-ink, and only the desktop one had
 * a hover. One component now, one palette, hover in both places.
 *
 * Inactive is pf-subtle rather than pf-muted: at this size muted (#848484,
 * 4.0:1) is under the AA floor, and the point of the inactive label is that it
 * stays readable.
 *
 * State is carried by aria-pressed, so the visible PL / EN stays the
 * accessible name instead of being overridden by an aria-label. */
export function LangToggle({
  onSwitch,
  className,
}: {
  onSwitch?: () => void
  className?: string
}) {
  const { lang, setLang } = useLang()

  return (
    <div role="group" aria-label={GROUP_LABEL[lang]} className={cn("flex items-center gap-1 font-medium", className)}>
      {LANGS.map((l, i) => (
        <Fragment key={l.code}>
          {i > 0 && <span aria-hidden="true" className="text-pf-200">/</span>}
          <button
            type="button"
            onClick={() => {
              setLang(l.code)
              onSwitch?.()
            }}
            aria-pressed={lang === l.code}
            className={cn(
              "rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              lang === l.code
                ? "font-bold text-pf-ink"
                : "text-pf-subtle [@media(hover:hover)]:hover:text-pf-ink"
            )}
          >
            {l.label}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
