import { motion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import { ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/Section.jsx'
import Badge from '../components/Badge.jsx'
import { projects } from '../data/content.js'

function LinkBtn({ href, icon, children }) {
  const base = 'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition'
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className={`${base} border-line hover:border-accent hover:text-white`}>{icon}{children}</a>
    : <span aria-disabled="true" title="Link coming soon" className={`${base} cursor-not-allowed border-line/60 text-mute/60`}>{icon}{children} · soon</span>
}

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Selected work." intro="Academic and personal projects demonstrating skills in Java, Python, C++, and software development fundamentals." />
      <ul className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.li key={p.id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
            whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-line bg-panel transition-colors hover:border-white/20">
            <div className="relative grid h-48 place-items-center overflow-hidden" style={{ background: `radial-gradient(circle at 30% 20%, ${p.accent}55, transparent 60%), #0e0e12` }} aria-hidden="true">
              <span className="font-display text-8xl font-bold opacity-20 transition-transform duration-500 group-hover:scale-110" style={{ color: p.accent }}>{p.id}</span>
              <span className="absolute left-5 top-5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/80">{p.kind}</span>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold">{p.title}</h2>
              <p className="mt-1 font-medium" style={{ color: p.accent }}>{p.short}</p>
              <p className="mt-4 leading-relaxed text-mute">{p.long}</p>
              <div className="mt-5 flex flex-wrap gap-2">{p.tech.map(t => <Badge key={t}>{t}</Badge>)}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkBtn href={p.github} icon={<FaGithub />}>GitHub</LinkBtn>
                <LinkBtn href={p.demo} icon={<ExternalLink size={15} />}>Live demo</LinkBtn>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  )
}
