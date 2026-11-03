import Reveal from './Reveal.jsx'
export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-32 pb-12 sm:pt-40">
      <Reveal><p className="font-display text-sm uppercase tracking-[0.25em] text-accent">{eyebrow}</p></Reveal>
      <Reveal delay={0.08}><h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1></Reveal>
      {intro && <Reveal delay={0.16}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{intro}</p></Reveal>}
    </header>
  )
}
