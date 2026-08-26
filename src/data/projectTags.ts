/** Tagi projektu — po trzy albo cztery. Zwykle typ pracy, domena i
 *  specjalizacja; czwarty, gdy jest, dokłada coś, czego te trzy nie mieszczą
 *  (u Codete to `NDA` — status projektu, nie umiejętność). Te same w obu
 *  językach, bo to terminy branżowe, których się nie tłumaczy.
 *
 *  Mieszkają tutaj, a nie w plikach copy ani w `projects.ts`, bo czytają je
 *  oba miejsca naraz: kafel na homepage i badge'e nad okładką na stronie
 *  projektu. Trzymane osobno w każdym z nich zaczęły się rozjeżdżać — Kafejeto
 *  pokazywało na kaflu jeden zestaw, a na własnej stronie inny. */
export const projectTags = {
  raporty: ["Product Design", "B2B2C", "SaaS", "UX Strategy"],
  clientAcquisition: ["Redesign", "B2B2C", "SaaS", "Workflow Optimization"],
  planujemyto: ["0→1 Design", "Brand Identity", "Design System"],
  codete: ["0→1 Design", "Enterprise B2B", "Design System", "NDA"],
  naturalnie: ["Redesign", "E-commerce", "Mobile Design"],
  kafejeto: ["UI Design", "E-commerce", "Responsive Web"],
  stats: ["Redesign", "MarTech", "Data Visualization"],
  dashboard: ["Product Design", "MarTech", "Design System"],
  banneroza: ["0→1 Design", "Non-profit", "UX Research"],
}
