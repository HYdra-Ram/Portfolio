import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          whileTap={{ scale: 0.92 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
