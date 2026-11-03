import { Link } from 'react-router-dom'
import Socials from './Socials.jsx'
import { nav, profile } from '../data/content.js'
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <p className="text-sm text-mute">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <ul className="flex gap-5 text-sm text-mute">{nav.map(n => <li key={n.to}><Link className="hover:text-white" to={n.to}>{n.label}</Link></li>)}</ul>
        <Socials />
      </div>
    </footer>
  )
}
