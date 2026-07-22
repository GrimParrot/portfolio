import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/dashboard.copy"

export function DashboardPage({ embedded = false }: { embedded?: boolean } = {}) {
  const { lang } = useLang()
  return <SimpleProjectPage embedded={embedded} copy={copy[lang]} backHref="/ui/dashboard" />
}
