// Datos estructurados (schema.org) para que Google entienda el negocio, sus sucursales y servicios.
// Los precios NO se publican aquí hasta que Max los confirme.
import { SITE } from '../data/site.js';

const DAY = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };

export function orgLD(home, logo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': home + '#org',
    name: SITE.name,
    url: home,
    logo,
    contactPoint: { '@type': 'ContactPoint', telephone: '+' + SITE.whatsapp, contactType: 'customer service', availableLanguage: 'es' },
  };
}

export function salonLD(b, { home, pageUrl, image }) {
  const [d1, o1, c1, d2, o2, c2] = b.oh;
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': pageUrl + '#salon',
    name: `${SITE.name} — ${b.name}`,
    url: pageUrl,
    image,
    telephone: b.phone,
    priceRange: SITE.priceRange,
    parentOrganization: { '@id': home + '#org' },
    address: {
      '@type': 'PostalAddress',
      ...(b.street ? { streetAddress: b.street } : {}),
      ...(b.postalCode ? { postalCode: b.postalCode } : {}),
      addressLocality: `${b.colonia}, ${b.locality}`,
      addressRegion: 'CDMX',
      addressCountry: 'MX',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: d1.map((d) => DAY[d]), opens: o1, closes: c1 },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: d2.map((d) => DAY[d]), opens: o2, closes: c2 },
    ],
  };
}

export function catalogLD(cat, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${cat.t} — ${SITE.name}`,
    url: pageUrl,
    itemListElement: cat.items.map(([n, , , d]) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: n, description: d, provider: { '@type': 'Organization', name: SITE.name } },
    })),
  };
}

export function crumbsLD(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}
