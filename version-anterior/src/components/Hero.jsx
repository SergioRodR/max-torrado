import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LINKS, WHATSAPP_BOOKING_URL, heading, body } from '../config.js'
import { EASE, Magnetic } from '../motion.jsx'
import { ArrowRightIcon, WhatsAppIcon } from './icons.jsx'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}
const lineReveal = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.2, ease: EASE } },
}

// Capa que combina desplazamiento por scroll (velocidad propia) + reacción al cursor.
function Layer({ scrollY, mouseX, mouseY, depth, className, style, children }) {
  const x = useTransform(mouseX, (v) => v * depth)
  const y = useTransform(mouseY, (v) => v * depth)
  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ y: scrollY }}>
      <motion.div className={className} style={{ ...style, x, y }}>{children}</motion.div>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Velocidades distintas por capa = profundidad
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '28%'])
  const farY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 260])
  const nearY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -220])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 180])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0])
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.6])

  // Cursor normalizado (-1..1) suavizado con resorte
  const spring = { stiffness: 60, damping: 20, mass: 0.6 }
  const mouseX = useSpring(useMotionValue(0), spring)
  const mouseY = useSpring(useMotionValue(0), spring)
  const glowX = useTransform(mouseX, (v) => `${v * 30}vw`)
  const glowY = useTransform(mouseY, (v) => `${v * 30}vh`)
  const photoX = useTransform(mouseX, (v) => v * -12)
  const photoY = useTransform(mouseY, (v) => v * -12)
  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const layer = { mouseX, mouseY }

  return (
    <section ref={ref} id="hero" onPointerMove={onPointerMove} className="code-section fx-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Capa 1 — fotografía (la más lenta) */}
      <motion.div className="fx-hero-bg" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          style={{ x: photoX, y: photoY }}
          initial={{ scale: 1.3 }}
          animate={ready ? { scale: 1.08 } : { scale: 1.3 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <img src="/images/hero.avif" alt="Hombre y mujer posando espalda con espalda contra fondo oscuro con iluminación dorada dramática" className="fx-hero-photo w-full h-full object-cover" decoding="async" />
        </motion.div>
        <div className="fx-hero-shade absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: veil }} />
      <div className="fx-vignette" />
      <div className="fx-grain" />

      {/* Capas decorativas (se ocultan en móvil para despejar la composición) */}
      <div className="fx-hero-deco">
      {/* Capa 2 — brillo dorado que sigue al cursor */}
      <motion.div className="fx-glow" style={{ left: 'calc(50% - 19rem)', top: 'calc(50% - 19rem)', x: glowX, y: glowY }} />

      {/* Capa 3 — elementos decorativos lejanos */}
      <Layer {...layer} scrollY={farY} depth={18}>
        <motion.div className="fx-ring top-20 left-10 w-32 h-32" initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.6 }} />
        <motion.div className="fx-ring fx-ring--soft bottom-32 right-20 w-48 h-48" initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.8 }} />
      </Layer>

      {/* Capa 4 — partículas cercanas (se mueven más rápido y en sentido contrario) */}
      <Layer {...layer} scrollY={nearY} depth={-40}>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full" style={{ background: 'rgb(166 123 91 / .5)' }}></div>
        <div className="absolute rounded-full" style={{ top: '22%', left: '18%', width: 6, height: 6, background: 'rgb(212 184 150 / .6)' }}></div>
        <div className="absolute rounded-full" style={{ bottom: '30%', right: '12%', width: 4, height: 4, background: 'rgb(212 184 150 / .5)' }}></div>
      </Layer>

      </div>

      {/* Capa 5 — contenido */}
      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div variants={stagger} initial="hidden" animate={ready ? 'show' : 'hidden'}>
          <motion.div variants={rise} className="fx-hero-badge inline-flex items-center gap-2 px-4 py-2 bg-gray-500/20 border border-gray-500/40 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
            <span className="text-gray-300 text-sm font-medium tracking-wider uppercase">Salón de Belleza Premium en Narvarte</span>
          </motion.div>

          <h1 className="fx-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={heading}>
            <span className="fx-mask"><motion.span variants={lineReveal}>Belleza que se siente,</motion.span></span>
            <span className="fx-mask"><motion.span variants={lineReveal} className="fx-gold-text">estilo que se distingue</motion.span></span>
          </h1>

          <motion.p variants={rise} className="fx-hero-lead text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto" style={body}>
            Especialistas en color y corte. Transformamos tu imagen con técnicas
            profesionales y atención personalizada.
          </motion.p>

          <motion.div variants={rise} className="fx-hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Magnetic className="fx-hero-primary">
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-300 text-black font-bold text-lg rounded-[var(--button-rounded-radius)] hover:bg-gray-600 hover:text-white transition-all duration-300 shadow-2xl shadow-gray-500/30 hover:shadow-gray-700/50 hover:-translate-y-1">
                <WhatsAppIcon className="w-6 h-6" />
                Agendar por WhatsApp
              </a>
            </Magnetic>
            <Magnetic className="fx-hero-secondary">
              <a href={LINKS.servicios} className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-300 border-2 border-gray-300 text-black font-bold text-lg rounded-[var(--button-rounded-radius)] hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-all duration-300">
                Ver Servicios
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={rise} className="fx-hero-trust mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm">+10 años de experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-sm">Productos profesionales</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">Atención personalizada</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div className="fx-scroll-cue" style={{ opacity: contentOpacity }}>
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.6, duration: 1 }}>
          <span>Scroll</span>
          <i />
        </motion.div>
      </motion.div>
    </section>
  )
}
