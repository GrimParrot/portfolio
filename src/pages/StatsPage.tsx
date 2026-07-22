import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/stats.copy"

export function StatsPage({ embedded = false }: { embedded?: boolean } = {}) {
  const { lang } = useLang()
  return <SimpleProjectPage embedded={embedded} copy={copy[lang]} backHref="/ui/stats" />
}
