import { createContext, useContext } from "react"

export type Lang = "pl" | "en"

export const LanguageContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
}>({ lang: "pl", setLang: () => {} })

/** Reads the current language. Lives here rather than beside the provider on
 *  purpose: a module that exports a component and a hook together cannot be
 *  hot-reloaded cleanly, so editing the provider would force a full reload of
 *  every one of the seventeen files that read this hook. Splitting the two
 *  keeps LanguageContext.tsx a pure component module. */
export function useLang() {
  return useContext(LanguageContext)
}
