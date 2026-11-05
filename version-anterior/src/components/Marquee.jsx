import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, useReducedMotion } from 'framer-motion'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

const WORDS = ['Corte', 'Coloración', 'Balayage', 'Peinados', 'Tratamientos', 'Spa Capilar']

// Cinta infinita cuya velocidad y dirección responden al scroll.
export default function Marquee() {
  const reduced = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const b = boost.get()
    if (b < 0) direction.current = -1
    else if (b > 0) direction.current = 1
    base.set(base.get() - direction.current * (delta / 1000) * (2.2 + Math.abs(b) * 2.2))
  })

  const group = (key) => (
    <div className="fx-marquee-item" key={key} aria-hidden={key !== 0}>
      {WORDS.map((word, i) => (
        <span key={word} style={{ display: 'contents' }}>
          <span className={i % 2 ? 'is-outline' : 'is-solid'}>{word}</span>
          <span className="fx-dot" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="fx-marquee">
      <motion.div className="fx-marquee-track" style={{ x }}>
        {[0, 1, 2, 3].map(group)}
      </motion.div>
    </div>
  )
}
