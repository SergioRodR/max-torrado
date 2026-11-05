// Datos generales del salón. Lo marcado con `porConfirmar` debe validarse con Max.
export const SITE = {
  name: 'Max Torrado Salón',
  shortName: 'Max Torrado',
  tagline: 'Belleza con firma',
  description:
    'Salón de belleza de autor en las colonias Moderna y Narvarte, CDMX. Balayage, rubios, color, corte, tratamientos, peinado, novias, maquillaje y uñas.',
  whatsapp: '525531403795',
  whatsappLabel: '55 3140 3795',
  phone: '+525565836855',
  phoneLabel: '55 6583 6855',
  instagram: { handle: '@maxtorradosalon', url: 'https://www.instagram.com/maxtorradosalon/', porConfirmar: true },
  email: { value: 'hola@maxtorrado.mx', porConfirmar: true },
  founded: 'Más de 10 años en CDMX',
  priceRange: '$$$',
};

export const wa = (text) =>
  `https://wa.me/${SITE.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;

export const money = (n) =>
  n === null ? 'Valoración' : n === 0 ? 'Incluido' : '$' + n.toLocaleString('es-MX');
