import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]
const HEADER_OFFSET = -80

// Instancia compartida de Lenis para que otras piezas puedan pausar o desplazar.
export const smooth = { lenis: null }

export function scrollToHash(hash) {
  const target = hash === '#hero' ? 0 : document.querySelector(hash)
  if (target === null) return
  if (smooth.lenis) smooth.lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else target.scrollIntoView({ behavior: 'smooth' })
}

// Scroll suave con inercia + navegación por anclas compensando el header fijo.
export function useSmoothScroll() {
  const reduced = useReducedMotion()
  useEffect(() => {
    let cleanupLenis
    if (!reduced) {
      const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
      smooth.lenis = lenis
      let frame
      const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
      frame = requestAnimationFrame(raf)
      cleanupLenis = () => { cancelAnimationFrame(frame); lenis.destroy(); smooth.lenis = null }
    }
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      event.preventDefault()
      scrollToHash(link.getAttribute('href'))
    }
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('click', onClick); cleanupLenis?.() }
  }, [reduced])
}

// Aparición al entrar en pantalla (fade + desplazamiento).
export function Reveal({ as = 'div', delay = 0, y = 40, className, style, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Botón "magnético": se desplaza ligeramente hacia el cursor.
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })
  const onMove = (e) => {
    if (reduced) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.div>
  )
}
