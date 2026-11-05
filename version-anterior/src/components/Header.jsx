import { useCallback, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { LINKS } from '../config.js'
import { EASE } from '../motion.jsx'
import { MenuButton, MobileMenu } from './MobileMenu.jsx'

const LOGO_ALT = 'Ornate white text reading Max Forrado is a Lion on a black textured background with vertical streaks'

const NAV_ITEMS = [
  { label: 'Nosotros', href: LINKS.nosotros },
  { label: 'Servicios', href: LINKS.servicios },
  { label: 'Galería', href: LINKS.galeria },
  { label: 'Contacto', href: LINKS.contacto },
]

export default function Header({ ready }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = () => {
    const r = buttonRef.current.getBoundingClientRect()
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    setMenuOpen((open) => !open)
  }

  return (
    <header id="global-header" className="code-section">
      <motion.nav
        className={`fx-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu' : ''} fixed top-0 left-0 right-0 z-50 bg-[var(--dark-background-color)]/95 backdrop-blur-md border-b border-[var(--dark-border-color)]`}
        initial={{ y: -100 }}
        animate={ready ? { y: 0 } : { y: -100 }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href={LINKS.inicio} className="flex items-center" data-logo="">
              <img src="/images/logo-480.avif" alt={LOGO_ALT} className="h-28 w-auto" decoding="async" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="fx-navlink text-[var(--light-text-color)] hover:text-[var(--primary-color)] transition-colors duration-300 text-sm font-medium tracking-wide uppercase">{item.label}</a>
              ))}
              <a href={LINKS.agendar} className="ml-4 px-6 py-3 bg-gray-300 text-black font-semibold text-sm uppercase tracking-wider rounded-[var(--button-rounded-radius)] hover:bg-gray-600 hover:text-white transition-all duration-300 shadow-lg shadow-gray-500/20">
                Reserva Tu Cita
              </a>
            </div>

            {/* Mobile Menu Button */}
            <MenuButton open={menuOpen} onToggle={toggleMenu} buttonRef={buttonRef} />
          </div>
        </div>

        {/* Progreso de lectura */}
        <motion.div className="fx-progress" style={{ scaleX: progress }} />
      </motion.nav>
      <MobileMenu open={menuOpen} onClose={closeMenu} origin={origin} />
    </header>
  )
}
