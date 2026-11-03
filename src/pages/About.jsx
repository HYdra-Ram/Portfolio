import { GraduationCap, Award } from 'lucide-react'
import { PageHeader } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Badge from '../components/Badge.jsx'
import { skills, education, journey } from '../data/content.js'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Me"
        title="Curious mind, dedicated learner."
        intro="I'm an MCA final year student at Gokhale Education Society's R. H. Sapat College of Engineering, Nashik, and a BCA graduate from SNDT Shahada, passionate about software engineering and programming in Java, Python, C, and C++."
      />
      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-24">
        {/* Education */}
        <section aria-labelledby="edu" className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-accent">
                <GraduationCap size={20} />
              </span>
              <h2 id="edu" className="font-display text-2xl font-bold">Educational Details</h2>
            </div>
          </Reveal>
          <ol className="relative space-y-8 border-l border-line pl-8">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <li className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-ink" />
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">{e.period}</p>
                    {e.score && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        {e.score}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
                  <p className="font-medium text-mute">{e.place}</p>
                  {e.details && <p className="mt-1 text-sm text-mute/80">{e.details}</p>}
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Technical skills & Additional courses */}
        <section aria-labelledby="skills">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-accent">
                <Award size={20} />
              </span>
              <h2 id="skills" className="font-display text-2xl font-bold">Skills &amp; Certifications</h2>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-panel p-6 transition hover:border-accent/50">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-mute">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map(s => <Badge key={s}>{s}</Badge>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Development journey */}
        <section aria-labelledby="journey" className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Reveal><h2 id="journey" className="font-display text-2xl font-bold">Academic &amp; Learning Journey</h2></Reveal>
          <ol className="space-y-4">
            {journey.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <li className="flex gap-4 rounded-2xl border border-line p-5">
                  <span className="font-display text-accent font-bold">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold">{t}</h3>
                    <p className="text-mute">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}
