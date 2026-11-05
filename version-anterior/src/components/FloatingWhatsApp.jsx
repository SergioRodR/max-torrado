import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { WHATSAPP_BOOKING_URL } from '../config.js'
import { WhatsAppIcon } from './icons.jsx'

// Aparece al dejar atrás el hero y se oculta al llegar a Contacto, que ya tiene su propio enlace.
export default function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const footer = document.getElementById('global-footer')
    const atContact = footer && footer.getBoundingClientRect().top < window.innerHeight * 0.85
    setVisible(y > window.innerHeight * 0.8 && !atContact)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar por WhatsApp"
          className="fx-wa"
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 20 }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <WhatsAppIcon className="w-7 h-7" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
