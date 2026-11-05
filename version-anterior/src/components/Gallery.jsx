import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LINKS, heading, body } from '../config.js'
import { EASE, Reveal, smooth } from '../motion.jsx'
import { ArrowRightIcon } from './icons.jsx'

const IMAGES = [
  {
    src: '/images/galeria-coloracion.avif',
    alt: 'Woman with long black hair viewed from behind in a salon, facing a dual mirror with a braided salon sign above',
    title: 'Coloración Profesional',
    subtitle: 'Técnica debalayage',
  },
  {
    src: '/images/galeria-estudio.avif',
    alt: 'Professional makeup and styling studio with two artists working on clients seated in front of ring lights and mirrors',
    title: 'Estudio Profesional',
  },
  {
    src: '/images/galeria-estilismo.avif',
    alt: 'Woman with long straight brown hair in a black jacket seen from behind at a salon station with mirrors and hair styling tools',
    title: 'Estilismo Personal',
  },
  {
    src: '/images/galeria-estilo-moda.avif',
    alt: 'Woman with long black hair with bangs wearing white crop top and green pants, standing in salon room with mirror and styling stations',
    title: 'Estilo y Moda',
  },
  {
    src: '/images/galeria-espacio.avif',
    alt: 'Empty, modern hairdressing salon displaying multiple styling chairs, shampoo washing sinks, and professional hair care products',
    title: 'Nuestro Espacio',
  },
  {
    src: '/images/galeria-equipo.avif',
    alt: 'Portrait of a successful female business owner standing proudly in her modern beauty salon, exuding confidence and professionalism',
    title: 'Nuestro Equipo',
  },
  {
    src: '/images/galeria-corte.avif',
    alt: 'Professional female barber cutting long hair of client with scissors during hairstyling session in modern dark barbershop interior',
    title: 'Corte Profesional',
  },
]

const ICON = { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

function Lightbox({ index, onClose, onStep }) {
  const image = IMAGES[index]
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    smooth.lenis?.stop()
    return () => { window.removeEventListener('keydown', onKey); smooth.lenis?.start() }
  }, [onClose, onStep])

  return (
    <motion.div className="fx-lightbox" role="dialog" aria-modal="true" aria-label={image.title} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <AnimatePresence mode="wait">
        <motion.figure key={image.src} onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease: EASE }}>
          <img src={image.src} alt={image.alt} />
          <figcaption>
            {image.title}
            <small>{image.subtitle ?? `${String(index + 1).padStart(2, '0')} / ${String(IMAGES.length).padStart(2, '0')}`}</small>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      <button type="button" className="fx-lb-btn" style={{ top: '1.25rem', right: '1.25rem' }} onClick={onClose} aria-label="Cerrar">
        <svg {...ICON}><path d="M6 6l12 12M6 18L18 6" /></svg>
      </button>
      <button type="button" className="fx-lb-btn" style={{ left: '1.25rem', top: '50%', marginTop: '-1.5rem' }} onClick={(e) => { e.stopPropagation(); onStep(-1) }} aria-label="Anterior">
        <svg {...ICON}><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button type="button" className="fx-lb-btn" style={{ right: '1.25rem', top: '50%', marginTop: '-1.5rem' }} onClick={(e) => { e.stopPropagation(); onStep(1) }} aria-label="Siguiente">
        <svg {...ICON}><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i + d + IMAGES.length) % IMAGES.length), [])

  return (
    <section id="gallery" className="code-section bg-[var(--dark-background-color)] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal className="inline-flex items-center gap-2 justify-center mb-6">
            <motion.div className="w-12 h-px bg-[var(--primary-color)]" style={{ originX: 1 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}></motion.div>
            <span className="text-[var(--primary-color)] text-sm font-semibold uppercase tracking-widest" style={body}>Nuestra Galería</span>
            <motion.div className="w-12 h-px bg-[var(--primary-color)]" style={{ originX: 0 }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}></motion.div>
          </Reveal>

          <Reveal as="h2" delay={0.1} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={heading}>
            Resultados que{' '}
            <span className="text-[var(--primary-color)]">inspiran</span>
          </Reveal>

          <Reveal as="p" delay={0.2} className="text-lg text-gray-400 max-w-2xl mx-auto" style={body}>
            Cada trabajo cuenta una historia de transformación. Descubre el nivel de
            detalle en Max Torrado Salón.
          </Reveal>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGES.map((image, i) => (
            <motion.button
              type="button"
              key={image.src}
              onClick={() => setOpen(i)}
              aria-label={`Ver ${image.title}`}
              className="fx-gallery-item relative group overflow-hidden rounded-2xl text-left"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 4) * 0.1 }}
            >
              <img src={image.src} alt={image.alt} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold" style={heading}>
                    {image.title}
                  </p>
                  {image.subtitle && <p className="text-gray-300 text-sm">{image.subtitle}</p>}
                </div>
              </div>
              <span className="fx-zoom" aria-hidden="true">
                <svg className="w-4 h-4" {...ICON}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
              </span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-16">
          <a href={LINKS.galeria} className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-semibold rounded-[var(--button-rounded-radius)] hover:bg-[var(--primary-color)] hover:text-black transition-all duration-300">
            Ver galería completa
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  )
}
