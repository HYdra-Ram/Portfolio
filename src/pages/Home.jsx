import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Socials from '../components/Socials.jsx'
import { profile } from '../data/content.js'

const words = ["Hi,", "I'm", 'Bhumika', 'Kuwar.']
const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <motion.div aria-hidden="true" className="absolute -top-24 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[120px]" animate={{ y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden="true" className="absolute bottom-0 left-[-10%] -z-10 h-[320px] w-[320px] rounded-full bg-warm/15 blur-[120px]" animate={{ y: [0, -24, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="mx-auto grid min-h-dvh max-w-6xl items-center gap-10 px-5 pb-24 pt-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 lg:order-1">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-medium text-mute">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> MCA Final Year Student · {profile.location}
          </motion.p>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.98] tracking-tight">
            {words.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                <motion.span className={`inline-block ${i > 1 ? 'text-accent' : ''}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Aspiring Software Developer passionate about building robust applications with Java, Python, C, and C++. Currently in the final year of MCA at Gokhale Education Society&apos;s R. H. Sapat College of Engineering, Nashik (BCA Graduate), eager to create innovative software solutions.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-3 text-sm text-soft/70">MCA Final Year Student · BCA Graduate · Java &amp; Python Enthusiast</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/projects" className={`${btn} bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90`}>Explore My Work <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contact" className={`${btn} border border-line text-white hover:border-accent`}>Let&apos;s Connect</Link>
            </motion.div>
            <Socials />
          </motion.div>
        </div>

        <motion.div className="order-1 mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:order-2" initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-line" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line bg-panel shadow-2xl">
              {!loaded && <div className="absolute inset-0 animate-pulse bg-panel" />}
              <img src={profile.avatar} alt="Portrait of Bhumika Jaypalsing Kuwar in a formal college blazer" width="900" height="1200" fetchPriority="high" onLoad={() => setLoaded(true)} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
            <motion.span className="absolute -left-3 bottom-10 rounded-full border border-line bg-ink/90 px-4 py-2 text-xs font-semibold backdrop-blur sm:-left-8" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity }}>Java · Python</motion.span>
            <motion.span className="absolute -right-2 top-10 rounded-full border border-line bg-ink/90 px-4 py-2 text-xs font-semibold backdrop-blur sm:-right-6" animate={{ y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity }}>MCA Final Year · C / C++</motion.span>
          </div>
        </motion.div>
      </div>
      <motion.div aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mute lg:block" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown /></motion.div>
    </section>
  )
}
