import { useState } from "react"
import { LanguageContext, type Lang } from "./lang"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved === "pl" || saved === "en") return saved
    return navigator.language.startsWith("pl") ? "pl" : "en"
  })

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
