// Datos de contacto y anclas compartidos entre secciones.
export const WHATSAPP_NUMBER = '525531403795'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const WHATSAPP_BOOKING_URL = `${WHATSAPP_URL}?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Max%20Torrado%20Salón`

// Las rutas internas del sitio original (/nosotros, /servicios, ...) no existen;
// se mapean a las secciones de esta misma página.
export const LINKS = {
  inicio: '#hero',
  nosotros: '#about',
  servicios: '#services',
  galeria: '#gallery',
  contacto: '#global-footer',
  agendar: '#global-footer',
}

export const heading = { fontFamily: 'var(--font-family-heading)' }
export const body = { fontFamily: 'var(--font-family-body)' }
