# Max Torrado Salón — sitio web

Sitio estático hecho con [Astro](https://astro.build). Diseño basado en la propuesta v4 (`propuesta/`).

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ para revisarlo
```

En Windows con Git Bash, para probar con la ruta de GitHub Pages:
`MSYS_NO_PATHCONV=1 BASE_PATH=/nombre-del-repo npm run build`

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/data/` | **Contenido editable**: servicios y precios, equipo, looks, sucursales, datos de contacto. |
| `src/assets/img/` | Fotos (se optimizan solas al compilar). |
| `src/components/` | Secciones: hero, menú de servicios, equipo, lookbook, sucursales, contacto… |
| `src/pages/` | Páginas. `servicios/[slug].astro` y `sucursales/[slug].astro` generan una página por categoría/sucursal. |
| `src/scripts/` | Interacciones (menú, buscador, carrusel, línea dorada…). |
| `src/styles/` | Estilos globales y de páginas internas. |
| `public/` | Favicon e imagen para compartir en redes. |
| `propuesta/`, `version-anterior/` | Material de trabajo; no se publica. |

## Publicación (GitHub Pages)

`.github/workflows/deploy.yml` compila y publica automáticamente al subir a `main`.
En el repositorio: **Settings → Pages → Source: GitHub Actions**.
La URL queda en `https://<usuario>.github.io/<repo>/`. Para un dominio propio, cambiar `SITE_URL` y `BASE_PATH: /` en el workflow.

## Pendiente de confirmar con el cliente

- Direcciones exactas, horarios y teléfono de cada sucursal (`src/data/sucursales.js`).
- Equipo real: nombres, especialidades, años y fotos (`src/data/equipo.js`). Los actuales son de ejemplo.
- Menú y precios reales (`src/data/servicios.js`). Los actuales son ilustrativos.
- Instagram y correo (`src/data/site.js`): se muestran en el sitio cuando `porConfirmar` pase a `false`.
- Foto de Max para su tarjeta del equipo.
- Fotos del lookbook y del salón reales (las actuales son de Pexels, licencia gratuita; IDs en `propuesta/img/creditos-pexels.json`).
- Aviso de privacidad: el texto es un borrador para revisión legal.

Ideas de mejora en reserva: `propuesta/ideas-pendientes.md`.
