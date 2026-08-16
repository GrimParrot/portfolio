import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/kafejeto.copy"

export function KafejetoPage() {
  const { lang } = useLang()
  return <SimpleProjectPage copy={copy[lang]} />
}
