import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { profile } from '../data/content.js'
const cls = 'grid h-11 w-11 place-items-center rounded-full border border-line text-soft/80 transition hover:border-accent hover:text-white hover:-translate-y-0.5'
export default function Socials() {
  return (
    <div className="flex gap-3">
      <a className={cls} href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><FaGithub size={18} /></a>
      <a className={cls} href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FaLinkedinIn size={18} /></a>
    </div>
  )
}
