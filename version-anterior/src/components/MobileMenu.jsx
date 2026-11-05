import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LINKS, WHATSAPP_BOOKING_URL } from '../config.js'
import { EASE, smooth } from '../motion.jsx'
import { WhatsAppIcon } from './icons.jsx'

const CURTAIN = [0.76, 0, 0.24, 1]

// Botón hamburguesa: dos líneas asimétricas que se convierten en una X.
export function MenuButton({ open, onToggle, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`fx-burger lg:hidden ${open ? 'is-open' : ''}`}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={open ? 'true' : 'false'}
      aria-controls="fx-menu"
      onClick={onToggle}
    >
      <span className="fx-burger-label" aria-hidden="true">
        <span>Menú</span>
        <span>Cerrar</span>
      </span>
      <span className="fx-burger-icon" aria-hidden="true">
        <i />
        <i />
      </span>
    </button>
  )
}

const ITEMS = [
  { label: 'Nosotros', href: LINKS.nosotros },
  { label: 'Servicios', href: LINKS.servicios },
  { label: 'Galería', href: LINKS.galeria },
  { label: 'Contacto', href: LINKS.contacto },
]

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}
const item = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } },
  exit: { y: '-110%', transition: { duration: 0.4, ease: CURTAIN } },
}
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.75 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Capa de menú a pantalla completa. Se monta en <body> porque el <nav> tiene
// backdrop-filter, que convertiría a `position: fixed` en relativo al nav.
export function MobileMenu({ open, onClose, origin }) {
  const firstLink = useRef(null)

  useEffect(() => {
    if (!open) return
    smooth.lenis?.stop()
    document.documentElement.classList.add('fx-menu-open')
    firstLink.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('fx-menu-open')
      smooth.lenis?.start()
    }
  }, [open, onClose])

  // Al elegir una sección se reactiva el scroll antes de que el manejador global de anclas desplace la página.
  const choose = () => { smooth.lenis?.start(); onClose() }
  const at = `${origin.x}px ${origin.y}px`

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="fx-menu"
          className="fx-menu lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ clipPath: `circle(0px at ${at})` }}
          animate={{ clipPath: `circle(150% at ${at})`, transition: { duration: 0.9, ease: CURTAIN } }}
          exit={{ clipPath: `circle(0px at ${at})`, transition: { duration: 0.7, ease: CURTAIN, delay: 0.2 } }}
        >
          <motion.div className="fx-menu-bg" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: EASE }} />
          <div className="fx-menu-glow" />
          <div className="fx-grain" />

          <motion.nav className="fx-menu-inner" variants={list} initial="hidden" animate="show" exit="exit">
            <motion.p className="fx-menu-eyebrow" variants={fade}>Navegación</motion.p>
            <ul className="fx-menu-list">
              {ITEMS.map((link, i) => (
                <li key={link.href} className="fx-menu-row">
                  <motion.a ref={i === 0 ? firstLink : undefined} href={link.href} onClick={choose} className="fx-menu-link" variants={item}>
                    <span className="fx-menu-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fx-menu-text">{link.label}</span>
                    <svg className="fx-menu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div className="fx-menu-footer" variants={fade}>
              <a href={WHATSAPP_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="fx-menu-cta">
                <WhatsAppIcon className="w-5 h-5" />
                Reserva tu cita
              </a>
              <div className="fx-menu-social">
                <span className="fx-menu-note">Narvarte · Moderna — CDMX</span>
                <a href="tel:+525565836855" aria-label="Llamar"><i className="fa-solid fa-phone" aria-hidden="true"></i></a>
                <a href="https://instagram.com/maxtorradosalon" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true"></i></a>
                <a href="https://facebook.com/maxtorradosalon" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
              </div>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
