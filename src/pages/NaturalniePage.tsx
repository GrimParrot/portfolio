import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/naturalnie.copy"

export function NaturalniePage() {
  const { lang } = useLang()
  return <SimpleProjectPage copy={copy[lang]} />
}
