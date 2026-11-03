import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { PageHeader } from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import { profile } from '../data/content.js'

const empty = { name: '', email: '', subject: '', message: '' }
const validate = v => {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a subject.'
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}
const field = 'mt-2 w-full rounded-xl border bg-panel px-4 py-3 text-soft placeholder:text-mute/60 focus:border-accent focus:outline-none'

export default function Contact() {
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const change = k => e => { setV({ ...v, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }

  const submit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    const errs = validate(v); setErrors(errs)
    if (Object.keys(errs).length) { setStatus('invalid'); return }
    setStatus('sending')
    try {
      // Netlify Forms: urlencoded POST to "/" with the form name.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', 'bot-field': '', ...v }).toString(),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setStatus('success'); setV(empty); setErrors({})
    } catch {
      setStatus('failed')
    }
  }

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      text: profile.email,
      href: `mailto:${profile.email}`,
      target: undefined,
    },
    {
      icon: <Phone size={18} />,
      label: 'Phone / Mobile',
      text: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
      target: undefined,
    },
    {
      icon: <MapPin size={18} />,
      label: 'Location & Address',
      text: profile.location,
      subtext: profile.address,
      href: undefined,
      target: undefined,
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        intro="Have an internship opportunity, an entry-level position, or just want to connect? Feel free to reach out directly or send a message below."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <ul className="space-y-4">
            {contactItems.map((item) => {
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-4 transition-colors hover:border-accent">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-accent">
                    {item.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-mute">{item.label}</span>
                    <span className="block truncate font-medium text-soft">{item.text}</span>
                    {item.subtext && <span className="block text-xs text-mute mt-0.5">{item.subtext}</span>}
                  </span>
                </div>
              )

              return (
                <li key={item.label}>
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      target={item.target}
                      download={item.download}
                      rel={item.target ? 'noopener noreferrer' : undefined}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="block"
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-line bg-panel p-6 sm:p-8">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden" aria-hidden="true"><label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            {[['name', 'Name', 'text', 'name'], ['email', 'Email', 'email', 'email'], ['subject', 'Subject', 'text', 'off']].map(([k, label, type, ac]) => (
              <div key={k}>
                <label htmlFor={k} className="text-sm font-medium">{label}</label>
                <input id={k} name={k} type={type} autoComplete={ac} value={v[k]} onChange={change(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={`${field} ${errors[k] ? 'border-red-400' : 'border-line'}`} />
                {errors[k] && <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-red-400">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={5} value={v.message} onChange={change('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} className={`${field} resize-y ${errors.message ? 'border-red-400' : 'border-line'}`} />
              {errors.message && <p id="message-err" role="alert" className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
            </div>
            <motion.button whileHover={status === 'sending' ? undefined : { scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-shadow hover:shadow-accent/40 disabled:cursor-wait disabled:opacity-70">
              {status === 'sending' ? <>Sending… <Loader2 size={16} className="animate-spin" /></> : <>Send message <Send size={16} /></>}
            </motion.button>
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {status === 'success' && <motion.p key="s" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-300"><CheckCircle2 size={18} className="mt-0.5 shrink-0" />Thanks! Your message was sent successfully. I&apos;ll get back to you soon.</motion.p>}
                {status === 'invalid' && <motion.p key="i" role="alert" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300"><AlertCircle size={18} className="shrink-0" />Please fix the highlighted fields.</motion.p>}
                {status === 'failed' && <motion.p key="f" role="alert" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300"><AlertCircle size={18} className="mt-0.5 shrink-0" />Your message could not be sent. Please try again, or email me directly at <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.</motion.p>}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </>
  )
}
