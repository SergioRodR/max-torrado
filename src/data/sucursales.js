// Sucursales. Dirección exacta, horario y teléfono por sucursal: POR CONFIRMAR con Max.
export const BRANCHES = [
  {
    slug: 'moderna', name: 'Colonia Moderna', nameHtml: 'Colonia <em>Moderna</em>', colonia: 'Moderna',
    img: 'suc-moderna', alt: 'Salón amplio con lavacabezas negros y luz cálida, sucursal Moderna',
    street: null, postalCode: null, locality: 'Benito Juárez', city: 'Ciudad de México',
    phone: '+525565836855', phoneLabel: '55 6583 6855',
    hours: [['Martes a sábado', '10:00 a 20:00'], ['Domingo', '10:00 a 16:00'], ['Lunes', 'Cerrado']],
    oh: [['Tu', 'We', 'Th', 'Fr', 'Sa'], '10:00', '20:00', ['Su'], '10:00', '16:00'],
    intro: 'Nuestra sucursal en la colonia Moderna, alcaldía Benito Juárez. El mismo equipo, el mismo menú y el mismo estándar que en Narvarte.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Max+Torrado+Sal%C3%B3n+Moderna+CDMX',
  },
  {
    slug: 'narvarte', name: 'Narvarte', nameHtml: '<em>Narvarte</em>', colonia: 'Narvarte',
    img: 'suc-narvarte', alt: 'Tocadores negros y lavacabezas blancos, sucursal Narvarte',
    street: null, postalCode: null, locality: 'Benito Juárez', city: 'Ciudad de México',
    phone: '+525531403795', phoneLabel: '55 3140 3795',
    hours: [['Martes a sábado', '10:00 a 20:00'], ['Domingo', '10:00 a 16:00'], ['Lunes', 'Cerrado']],
    oh: [['Tu', 'We', 'Th', 'Fr', 'Sa'], '10:00', '20:00', ['Su'], '10:00', '16:00'],
    intro: 'Nuestra sucursal en la colonia Narvarte, alcaldía Benito Juárez, con corte, color, rubios, tratamientos, peinado y belleza.',
    maps: 'https://www.google.com/maps/search/?api=1&query=Max+Torrado+Sal%C3%B3n+Narvarte+CDMX',
  },
];
