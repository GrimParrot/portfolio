import { SimpleProjectPage } from "@/components/SimpleProjectPage"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/naturalnie.copy"

export function NaturalniePage({ embedded = false }: { embedded?: boolean } = {}) {
  const { lang } = useLang()
  return <SimpleProjectPage embedded={embedded} copy={copy[lang]} backHref="/ui/naturalnie" />
}
