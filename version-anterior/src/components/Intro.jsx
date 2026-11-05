import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../motion.jsx'

// Cortina de apertura: logo + línea de carga, luego se levanta revelando el hero.
export default function Intro({ onDone }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  return (
    <motion.div
      className="fx-intro"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
      onAnimationComplete={onDone}
    >
      <motion.img
        src="/images/logo-480.avif"
        alt="Max Torrado Salón"
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: EASE }}
      />
      <div className="fx-intro-line">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.15 }} />
      </div>
    </motion.div>
  )
}
