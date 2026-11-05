import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { LINKS, heading, body } from '../config.js'
import { EASE, Magnetic, Reveal } from '../motion.jsx'
import { ArrowRightIcon } from './icons.jsx'

// `lines`: servicios cuya descripción en el sitio original está en bloques <div>
// fuera del párrafo; se conserva esa estructura para que el espaciado sea idéntico.
const SERVICES = [
  {
    title: 'Corte de Cabello',
    text: 'Cortes personalizados que se adaptan a la forma de tu rostro y estilo de vida. Desde clásicos elegantes hasta tendencias modernas.',
    icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
  },
  {
    title: 'Coloración Profesional',
    text: 'Creamos tonos vibrantes y duraderos con técnicas actuales de aplicación.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    title: 'Tecnicas/ Trending',
    lines: [
      'Efectos de luz que aportan dimensión y movimiento al cabello y rostro.',
      'Highlights, blayage, grey blending, contouring, soft root melt y más.',
    ],
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'Peinados',
    text: 'Express y para eventos especiales. Looks elegantes y sofisticados',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'Tratamientos Capilares',
    lines: [
      'Diagnosticamos el cabello y cuero',
      'cabelludo para el tratamiento',
      'adecuado, reparación, hidratación, brillo, detox, exfoliación, botox, etc.',
    ],
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    title: 'Spa Capilar',
    text: 'Nos ocupamos de las necesidades de tu cabello, y tú de lucirlo.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const descriptionClass = 'text-[var(--gray-text-color)] mb-6 leading-relaxed'

// Tarjeta con inclinación 3D y foco de luz que sigue al cursor.
function TiltCard({ children, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 10)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      className="fx-tilt"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.12 }}
    >
      <motion.div ref={ref} className="fx-tilt-inner" style={{ rotateX: rx, rotateY: ry }} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="code-section bg-[var(--medium-background-color)] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal className="inline-flex items-center gap-2 justify-center mb-6">
            <motion.div className="w-12 h-px bg-[var(--primary-color)]" style={{ originX: 1 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}></motion.div>
            <span className="text-[var(--primary-color)] text-sm font-semibold uppercase tracking-widest" style={body}>Nuestros Servicios</span>
            <motion.div className="w-12 h-px bg-[var(--primary-color)]" style={{ originX: 0 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}></motion.div>
          </Reveal>

          <Reveal as="h2" delay={0.1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--dark-text-color)] mb-6" style={heading}>
            Servicios diseñados para{' '}
            <span className="text-[var(--primary-color)]">tu transformación</span>
          </Reveal>

          <Reveal as="p" delay={0.2} className="text-lg text-[var(--gray-text-color)] max-w-2xl mx-auto" style={body}>
            Cada servicio está pensado para resaltar tu belleza natural y brindarte
            una experiencia única de cuidado personal.
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} index={i}>
              <div className="fx-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[var(--light-border-color)]">
                <span className="fx-spot" aria-hidden="true" />
                <span className="fx-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="w-16 h-16 fx-icon rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[var(--primary-color)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={service.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--dark-text-color)] mb-3" style={heading}>
                  {service.title}
                </h3>
                {service.lines ? (
                  <>
                    <p className={descriptionClass} style={body}></p>
                    {service.lines.map((line) => <div key={line}>{line}</div>)}
                    <p></p>
                  </>
                ) : (
                  <p className={descriptionClass} style={body}>
                    {service.text}
                  </p>
                )}
                <a href={LINKS.agendar} className="inline-flex items-center gap-2 text-[var(--primary-color)] font-semibold hover:gap-3 transition-all">
                  Reservar
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-16">
          <Magnetic>
            <a href={LINKS.servicios} className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--dark-background-color)] text-white font-semibold rounded-[var(--button-rounded-radius)] hover:bg-[var(--dark-text-color)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Ver todos los servicios
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
