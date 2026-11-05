// Lookbook (fotos de ejemplo de Pexels). f = filtro; cat = categoría del menú.
export const LOOKS = [
  { img: 'lb-ombre', alt: 'Cabello lacio con degradado de castaño a rubio ceniza', n: 'Rubio ceniza', tec: 'Balayage', who: 'Valeria', tm: '3 a 4 h', f: 'rubios', cat: 'rubios' },
  { img: 'lb-bob', alt: 'Bob a la altura del hombro en rubio dorado', n: 'Bob dorado', tec: 'Corte y color', who: 'Daniela', tm: '2 h', f: 'corte', cat: 'corte' },
  { img: 'lb-cobre', alt: 'Cabello largo en cobre intenso', n: 'Cobre intenso', tec: 'Color creativo', who: 'Rodrigo', tm: '3 h', f: 'color', cat: 'color', pos: '62% 50%' },
  { img: 'lb-rizos', alt: 'Melena de rizos definidos en negro', n: 'Rizos definidos', tec: 'Corte en seco', who: 'Daniela', tm: '60 min', f: 'corte', cat: 'corte' },
  { img: 'lb-platino', alt: 'Rubio platino perla en ondas suaves', n: 'Platino perla', tec: 'Rubio platino', who: 'Rodrigo', tm: '4 a 5 h', f: 'rubios', cat: 'rubios', pos: '40% 50%' },
  { img: 'lb-recogido', alt: 'Recogido elegante con vestido de noche', n: 'Recogido de noche', tec: 'Recogido', who: 'Andrea', tm: '75 min', f: 'peinado', cat: 'peinado', pos: '62% 40%' },
  { img: 'lb-sol', alt: 'Ondas cobrizas a contraluz', n: 'Ondas de sol', tec: 'Balayage', who: 'Valeria', tm: '3 a 4 h', f: 'rubios', cat: 'rubios' },
  { img: 'lb-bobdark', alt: 'Bob castaño texturizado', n: 'Bob texturizado', tec: 'Bob y pixie', who: 'Daniela', tm: '60 min', f: 'corte', cat: 'corte', pos: '45% 35%' },
  { img: 'lb-ondas', alt: 'Melena larga con volumen y onda abierta', n: 'Volumen natural', tec: 'Botox capilar', who: 'Andrea', tm: '2 h', f: 'trat', cat: 'trat' },
];

export const LOOK_FILTERS = [
  ['all', 'Todos'], ['rubios', 'Rubios y balayage'], ['color', 'Color'],
  ['corte', 'Corte'], ['peinado', 'Peinado'], ['trat', 'Tratamiento'],
];

export const lookMsg = (l) =>
  `Hola, vi el look "${l.n}" (${l.tec} con ${l.who}) en su sitio y me gustaría algo similar. ¿Me pueden asesorar?`;
