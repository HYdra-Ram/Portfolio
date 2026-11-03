import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/75 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label="Bhumika Kuwar, home" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white font-extrabold">B</span>
          <span className="hidden sm:inline">Bhumika<span className="text-accent">.</span></span>
        </Link>
        <ul className="hidden gap-1 md:flex">
          {nav.map(n => (
            <li key={n.to}>
              <NavLink to={n.to} end className={({ isActive }) => `relative block px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-mute hover:text-white'}`}>
                {({ isActive }) => (<>{n.label}{isActive && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-px h-px bg-accent" />}</>)}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className="grid h-11 w-11 place-items-center rounded-xl border border-line md:hidden" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-ink md:hidden">
            {nav.map((n, i) => (
              <motion.li key={n.to} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <NavLink to={n.to} end className={({ isActive }) => `block px-5 py-4 text-lg font-semibold ${isActive ? 'text-accent' : 'text-soft'}`}>{n.label}</NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
