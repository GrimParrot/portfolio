import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/stats.copy"

export function StatsPage() {
  const { lang } = useLang()
  return <SimpleProjectPage copy={copy[lang]} />
}
