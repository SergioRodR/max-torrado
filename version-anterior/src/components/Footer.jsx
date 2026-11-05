import { WHATSAPP_URL } from '../config.js'
import { Reveal } from '../motion.jsx'

const inputClass = 'w-full px-4 py-3 bg-[var(--dark-background-color)] border border-[var(--dark-border-color)] rounded-[var(--button-rounded-radius)] text-[var(--light-text-color)] placeholder-[var(--gray-text-color)] focus:outline-none focus:border-[var(--primary-color)] transition-colors'

// El formulario arma un mensaje con los datos capturados y lo abre en WhatsApp.
function handleSubmit(event) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const lines = [
    'Hola, les escribo desde el sitio web de Max Torrado Salón.',
    '',
    `Nombre: ${data.get('name')}`,
    `Correo: ${data.get('email')}`,
  ]
  const phone = data.get('phone').trim()
  if (phone) lines.push(`Teléfono: ${phone}`)
  lines.push('', data.get('message'))

  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
  event.currentTarget.reset()
}

export default function Footer() {
  return (
    <footer id="global-footer" className="code-section">
      <footer className="bg-[var(--dark-background-color)] text-[var(--light-text-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Reveal>
              <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">
                Contáctanos
              </h3>
              <p className="text-[var(--gray-text-color)] mb-8">
                ¿Tienes preguntas o quieres agendar una cita? Escríbenos y te
                responderemos pronto.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <input type="text" name="name" placeholder="Tu nombre" required className={inputClass} />
                </div>
                <div>
                  <input type="email" name="email" placeholder="Tu correo electrónico" required className={inputClass} />
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Tu teléfono (opcional)" className={inputClass} />
                </div>
                <div>
                  <textarea name="message" rows="4" placeholder="¿En qué podemos ayudarte?" required className={`${inputClass} resize-none`}></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-4 bg-gray-300 text-black font-bold uppercase tracking-wider rounded-[var(--button-rounded-radius)] hover:bg-gray-600 hover:text-white transition-all duration-300 shadow-lg shadow-gray-500/20">
                  Enviar Mensaje
                </button>
              </form>
            </Reveal>

            {/* Contact Info */}
            <Reveal delay={0.15} className="lg:pl-12 lg:border-l border-[var(--dark-border-color)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">
                Información de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 fx-icon rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-location-dot text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dirección</h4>
                    <p className="text-[var(--gray-text-color)]">
                      Enrique Rébsamen 364-local B-C, Narvarte Poniente, Benito
                      Juárez, CDMX<br />
                      Jorge Washington 122-local 2 Moderna, Benito Juárez, CDMX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 fx-icon rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-phone text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Teléfono</h4>
                    <a href="tel:+525565836855" className="text-[var(--gray-text-color)] hover:text-[var(--primary-color)] transition-colors">55 6583 6855</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 fx-icon rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] hover:text-[var(--accent4-color)] transition-colors font-medium">Agendar por WhatsApp</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 fx-icon rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-clock text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Horario</h4>
                    <p className="text-[var(--gray-text-color)]">
                      Lunes a Sábado: 10:00 - 20:00<br />Domingo: (Solo sucursal de
                      Enrique Rebsamen de 11:00 - 17:00
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-[var(--dark-border-color)]">
                  <h4 className="font-semibold mb-4">Síguenos</h4>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/maxtorradosalon" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[var(--dark-border-color)] rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-all duration-300 group">
                      <i className="fa-brands fa-instagram text-xl text-[var(--light-text-color)] group-hover:text-[var(--dark-background-color)]" aria-hidden="true"></i>
                    </a>
                    <a href="https://facebook.com/maxtorradosalon" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[var(--dark-border-color)] rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-all duration-300 group">
                      <i className="fa-brands fa-facebook-f text-xl text-[var(--light-text-color)] group-hover:text-[var(--dark-background-color)]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[var(--dark-border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo-320.avif" alt="Ornate white text reading Max Forrado is a Lion on a black textured background with vertical streaks" className="h-28 w-auto" loading="lazy" decoding="async" />
            </div>
            <p className="text-[var(--gray-text-color)] text-sm text-center">
              © 2026 Max Torrado Salón. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </footer>
  )
}
