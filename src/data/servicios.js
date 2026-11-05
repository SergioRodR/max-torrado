// Menú de servicios. Catálogo y precios ILUSTRATIVOS: validar con Max antes de publicar.
// items: [nombre, duración, precio desde (null = valoración, 0 = incluido), descripción]
export const CATS = [
  {
    k: 'corte', slug: 'corte', g: 'Cabello', t: 'Corte', img: 'svc-corte',
    d: 'Estudio de rostro, textura y rutina antes de la primera tijera.',
    seo: 'Cortes de autor para dama en las colonias Moderna y Narvarte, CDMX: bob, pixie, capas y flequillos diseñados con visagismo para tu rostro y tu rutina.',
    long: 'Antes de cortar estudiamos la forma de tu rostro, la textura y la caída natural de tu cabello, y cómo te peinas en el día a día. El resultado es un corte que se ve bien el día uno y sigue viéndose bien seis semanas después.',
    items: [
      ['Corte de autor', '60 min', 650, 'Visagismo, lavado, corte y acabado. Pensado para crecer bien.'],
      ['Bob y pixie', '60 min', 650, 'Líneas precisas para cortes cortos que no pierden forma.'],
      ['Corte y peinado', '90 min', 900, 'Corte de autor con brushing o ondas para salir lista.'],
      ['Flequillo y retoque', '20 min', 200, 'Cortina, recto o desfilado. Entre cortes, sin cita larga.'],
      ['Corte infantil', '30 min', 350, 'Hasta 10 años, con paciencia y sin prisas.'],
    ],
  },
  {
    k: 'color', slug: 'color', g: 'Cabello', t: 'Color', img: 'svc-color',
    d: 'Tonos profundos y duraderos, formulados para tu piel y tu historial.',
    seo: 'Coloración profesional en CDMX: color global, retoque de raíz, gloss, grey blending y color creativo con productos profesionales.',
    long: 'Formulamos cada color según tu tono de piel, tu historial químico y el mantenimiento que puedes darle. Trabajamos con marcas profesionales y técnicas que cuidan la fibra para que el brillo dure.',
    items: [
      ['Color global', '2 h', 1400, 'Tono uniforme de raíz a puntas con brillo final.'],
      ['Retoque de raíz', '90 min', 1100, 'Mantenimiento cada 4 a 6 semanas.'],
      ['Gloss y matiz', '45 min', 700, 'Brillo espejo y corrección de reflejos no deseados.'],
      ['Grey blending', '2 h', 1600, 'Integramos las canas en lugar de cubrirlas cada tres semanas.'],
      ['Color creativo', '3 h', 2200, 'Cobres, rojos y fantasía con técnica de cuidado.'],
      ['Corrección de color', 'Valoración', null, 'Para resultados que no salieron como esperabas. Requiere diagnóstico.'],
    ],
  },
  {
    k: 'rubios', slug: 'rubios-y-balayage', g: 'Cabello', t: 'Rubios y aclarados', img: 'lb-ombre',
    d: 'Luz a mano alzada y aclarados con protección de enlaces en cada paso.',
    seo: 'Balayage, babylights, AirTouch y rubio platino en Narvarte y la colonia Moderna, CDMX, con protección de enlaces para cuidar tu cabello.',
    long: 'Los rubios son nuestra especialidad. Aclaramos a mano alzada y por capas, protegiendo los enlaces del cabello en cada paso, para lograr transiciones invisibles y un rubio que se ve sano.',
    items: [
      ['Balayage', '3 a 4 h', 2800, 'Aclarado a mano alzada con transición invisible desde la raíz.'],
      ['Babylights', '3 h', 2600, 'Mechas finísimas para una luz natural y uniforme.'],
      ['Highlights y contouring', '2 a 3 h', 2200, 'Luz enfocada alrededor del rostro para iluminar facciones.'],
      ['Soft root melt', '2 h', 1800, 'Raíz difuminada para que el crecimiento no marque línea.'],
      ['AirTouch', '4 h', 3200, 'Degradado ultra suave con secadora para un rubio sin cortes.'],
      ['Rubio platino', '4 a 5 h', 3500, 'Aclarado completo y matiz perla. Puede requerir dos sesiones.'],
    ],
  },
  {
    k: 'trat', slug: 'tratamientos', g: 'Cabello', t: 'Tratamientos', img: 'svc-trat',
    d: 'Primero el cabello sano. Rituales para reparar, hidratar y alisar.',
    seo: 'Tratamientos capilares en CDMX: diagnóstico, hidratación profunda, reconstrucción de enlaces, botox capilar, keratina y detox de cuero cabelludo.',
    long: 'Todo empieza con un diagnóstico de cuero cabelludo, porosidad y elasticidad. Con eso elegimos el ritual que tu cabello necesita, ya sea para recuperarse de una decoloración o para mantenerse manejable.',
    items: [
      ['Diagnóstico capilar', '20 min', 0, 'Cuero cabelludo, porosidad y elasticidad. Incluido en tu primera visita.'],
      ['Ritual de hidratación', '45 min', 600, 'Mascarilla profesional, masaje y sellado con calor.'],
      ['Reconstrucción de enlaces', '60 min', 900, 'Repara la fibra después de decoloraciones.'],
      ['Botox capilar', '2 h', 1800, 'Rellena y suaviza la fibra; reduce el frizz por semanas.'],
      ['Alisado con keratina', '2 a 3 h', 2500, 'Liso pulido y manejable de 3 a 4 meses.'],
      ['Detox de cuero cabelludo', '45 min', 650, 'Exfoliación y equilibrio para un crecimiento sano.'],
    ],
  },
  {
    k: 'peinado', slug: 'peinado-y-eventos', g: 'Cabello', t: 'Peinado y eventos', img: 'svc-peinado',
    d: 'Ondas, recogidos y brushing que duran toda la noche.',
    seo: 'Peinados para eventos en CDMX: brushing, ondas, recogidos y paquetes de peinado y maquillaje para graduaciones, bodas e invitadas.',
    long: 'Peinados pensados para durar la noche entera y verse bien en cada foto. Te recomendamos llegar con el cabello limpio y seco, y traer una foto de tu vestido o accesorios.',
    items: [
      ['Brushing', '40 min', 380, 'Secado con volumen, liso pulido o puntas hacia dentro.'],
      ['Ondas de evento', '60 min', 650, 'Ondas definidas o glam, fijadas para durar.'],
      ['Recogido', '75 min', 900, 'Chongo pulido, bajo o despeinado chic.'],
      ['Peinado y maquillaje', '2 h', 1700, 'Look completo para graduaciones, bodas e invitadas.'],
    ],
  },
  {
    k: 'novias', slug: 'novias', g: 'Cabello', t: 'Novias', img: 'svc-novias',
    d: 'Acompañamos todo el proceso: prueba, día de la boda y retoques.',
    seo: 'Peinado y maquillaje de novia en CDMX: prueba previa, servicio el día de la boda en salón o a domicilio, y paquetes para damas y mamás.',
    long: 'Planeamos tu look de novia contigo desde la prueba: probamos opciones con tu vestido y accesorios, y el día de la boda te acompañamos con el peinado, el maquillaje y un retoque antes de la ceremonia.',
    items: [
      ['Prueba de peinado', '90 min', 1200, 'Probamos opciones con tu vestido y accesorios.'],
      ['Peinado de novia', 'Día de la boda', 2500, 'En salón o a domicilio, con retoque antes de la ceremonia.'],
      ['Paquete novia', 'Prueba + día', 5500, 'Prueba, peinado y maquillaje del día con pestañas incluidas.'],
      ['Damas y mamás', '60 min', 900, 'Peinado coordinado con el estilo de la novia.'],
    ],
  },
  {
    k: 'caballero', slug: 'caballero', g: 'Cabello', t: 'Caballero', img: 'svc-caballero',
    d: 'Precisión de barbería con la calma de un salón.',
    seo: 'Corte de caballero, fade y barba con toalla caliente en las colonias Moderna y Narvarte, CDMX.',
    long: 'Cortes masculinos de precisión, degradados limpios y arreglo de barba con navaja y toalla caliente, en un ambiente tranquilo y sin prisas.',
    items: [
      ['Corte de caballero', '45 min', 380, 'Tijera o máquina, lavado y peinado.'],
      ['Fade', '50 min', 420, 'Degradado limpio, bajo, medio o alto.'],
      ['Barba con toalla caliente', '30 min', 280, 'Perfilado, navaja y aceites.'],
      ['Corte y barba', '75 min', 600, 'El servicio completo.'],
      ['Camuflaje de canas', '30 min', 450, 'Reduce las canas sin que se note el color.'],
    ],
  },
  {
    k: 'maquillaje', slug: 'maquillaje', g: 'Belleza', t: 'Maquillaje', img: 'svc-maquillaje',
    d: 'Piel luminosa y acabados que resisten fotos y horas.',
    seo: 'Maquillaje social y de noche en CDMX, y clases de automaquillaje personalizadas.',
    long: 'Maquillaje que respeta tus facciones: piel luminosa, acabados de larga duración y la intensidad que pide tu evento. También enseñamos tu propia rutina con tus productos.',
    items: [
      ['Maquillaje social', '60 min', 900, 'Natural o glam para día y eventos.'],
      ['Maquillaje de noche', '75 min', 1100, 'Ojos definidos y larga duración.'],
      ['Clase de automaquillaje', '2 h', 1500, 'Aprende tu rutina con tus propios productos.'],
    ],
  },
  {
    k: 'cejas', slug: 'cejas-y-pestanas', g: 'Belleza', t: 'Cejas y pestañas', img: 'svc-cejas',
    d: 'Diseño a la medida de tu rostro, sin exagerar.',
    seo: 'Diseño y laminado de cejas, lifting y tinte de pestañas en las colonias Moderna y Narvarte, CDMX.',
    long: 'Diseñamos tus cejas a partir de medidas de tu rostro para enmarcar la mirada sin exagerar, y realzamos tus pestañas naturales sin extensiones.',
    items: [
      ['Diseño de cejas', '30 min', 300, 'Medición, depilación y forma.'],
      ['Laminado de cejas', '45 min', 550, 'Cejas peinadas y con volumen por semanas.'],
      ['Lifting de pestañas', '60 min', 650, 'Curvatura natural sin extensiones.'],
      ['Tinte de cejas o pestañas', '20 min', 200, 'Más definición en minutos.'],
    ],
  },
  {
    k: 'unas', slug: 'unas', g: 'Belleza', t: 'Uñas', img: 'svc-unas',
    d: 'Manos y pies impecables con productos profesionales.',
    seo: 'Manicure, pedicure, gelish, uñas acrílicas y nail art en CDMX.',
    long: 'Manicure y pedicure con productos profesionales y herramientas esterilizadas, desde un esmalte clásico hasta acrílicas y nail art.',
    items: [
      ['Manicure spa', '45 min', 350, 'Limado, cutícula, exfoliación y esmalte.'],
      ['Gelish en manos', '60 min', 450, 'Color que dura hasta tres semanas.'],
      ['Pedicure spa', '60 min', 500, 'Exfoliación, hidratación y esmalte.'],
      ['Uñas acrílicas', '2 h', 750, 'Largo y forma a tu gusto.'],
      ['Nail art', 'Por uña', 50, 'Diseños, cromados y detalles.'],
    ],
  },
];

export const TOTAL_SERVICIOS = CATS.reduce((a, c) => a + c.items.length, 0);
export const catByKey = (k) => CATS.find((c) => c.k === k);
