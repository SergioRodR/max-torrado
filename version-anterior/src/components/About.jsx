import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { LINKS, heading, body } from '../config.js'
import { EASE, Reveal } from '../motion.jsx'
import { ArrowRightIcon } from './icons.jsx'

const FEATURES = [
  {
    title: 'Técnicas Premium',
    text: 'Formación continua en tendencias internacionales',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'Atención Personalizada',
    text: 'Cada cliente recibe un servicio único y exclusivo',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Productos Selectos',
    text: 'Marcas reconocidas a nivel mundial',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Fácil de agendar',
    text: 'Estas a un "click" para tu cambio de look',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const PARAGRAPHS = [
  'Max Torrado es un espacio dedicado a resaltar tu belleza y estilo, con técnicas profesionales en color y corte.',
  'Nuestro equipo de estilistas combina creatividad, experiencia y pasión por transformar tu imagen.',
  'Utilizamos productos de alta gama y las últimas tendencias',
  'internacionales para garantizar',
  'resultados excepcionales.',
  'Cada visita es una experiencia única.',
]

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>+{value}</span>
}

export default function About() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const k = reduced ? 0 : 1
  const photoY = useTransform(scrollYProgress, [0, 1], [`${-9 * k}%`, `${9 * k}%`])
  const frameY = useTransform(scrollYProgress, [0, 1], [40 * k, -40 * k])
  const blockY = useTransform(scrollYProgress, [0, 1], [90 * k, -90 * k])
  const badgeY = useTransform(scrollYProgress, [0, 1], [120 * k, -60 * k])

  return (
    <section ref={ref} id="about" className="code-section bg-[var(--light-background-color)] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <Reveal className="relative" y={60}>
            <motion.div className="relative z-10" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -15% 0px' }}>
              <motion.div
                className="fx-photo"
                variants={{
                  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE } },
                }}
              >
                <motion.img src="/images/nosotros-salon.avif" alt="Interior del salón Max Torrado" width="768" height="1152" className="w-full" style={{ y: photoY, scale: 1.2 }} loading="lazy" decoding="async" />
              </motion.div>
            </motion.div>
            {/* Decorative Frame */}
            <motion.div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--primary-color)] rounded-2xl" style={{ y: frameY }}></motion.div>
            <motion.div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl -z-10" style={{ y: blockY, background: 'rgb(166 123 91 / .12)' }}></motion.div>

            {/* Experience Badge */}
            <motion.div className="absolute -bottom-8 -right-4 lg:-right-8 bg-[var(--dark-background-color)] text-white p-6 rounded-2xl shadow-xl z-10" style={{ y: badgeY }}>
              <div className="text-center">
                <span className="block text-4xl font-bold text-[var(--primary-color)]" style={heading}><CountUp to={10} /></span>
                <span className="text-sm uppercase tracking-wider">Años de<br />Experiencia</span>
              </div>
            </motion.div>
          </Reveal>

          {/* Content Column */}
          <div className="lg:pl-8">
            <Reveal className="inline-flex items-center gap-2 mb-6">
              <motion.div className="w-12 h-px bg-[var(--primary-color)]" style={{ originX: 0 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}></motion.div>
              <span className="text-[var(--primary-color)] text-sm font-semibold uppercase tracking-widest" style={body}>Sobre Nosotros</span>
            </Reveal>

            <Reveal as="h2" delay={0.1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--dark-text-color)] mb-6 leading-tight" style={heading}>
              Un espacio dedicado a{' '}
              <span className="text-[var(--primary-color)]">resaltar tu belleza</span>
            </Reveal>

            <p className="text-lg text-[var(--gray-text-color)] mb-8 leading-relaxed" style={body}></p>
            {PARAGRAPHS.map((text, i) => (
              <Reveal key={text} y={20} delay={0.15 + i * 0.06}>{text}</Reveal>
            ))}
            <p></p>

            <p className="text-lg text-[var(--gray-text-color)] mb-10 leading-relaxed" style={body}><br /></p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.1} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 fx-icon rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--primary-color)] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--dark-text-color)] mb-1" style={body}>
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--gray-text-color)]" style={body}>
                      {feature.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <a href={LINKS.nosotros} className="inline-flex items-center gap-2 text-[var(--dark-text-color)] font-semibold hover:text-[var(--primary-color)] transition-colors group">
                Conoce más sobre nosotros
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
