import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/dashboard.copy"

export function DashboardPage() {
  const { lang } = useLang()
  return <SimpleProjectPage copy={copy[lang]} />
}
