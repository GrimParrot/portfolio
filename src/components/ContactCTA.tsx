export function ContactCTA() {
  return (
    <div className="mt-8 bg-[#0F172A] rounded-2xl px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p className="text-white font-black text-xl mb-1">Chcesz porozmawiać o tym projekcie?</p>
        <p className="text-white/50">Chętnie opowiem więcej o procesie, decyzjach i kontekście — w tym o tym, czego nie widać na screenshotach.</p>
      </div>
      <a
        href="mailto:suprun.edyta@gmail.com"
        className="whitespace-nowrap bg-white text-[#0F172A] font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
      >
        Napisz do mnie →
      </a>
    </div>
  )
}
