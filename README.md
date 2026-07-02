# Motores Jordan — Sitio Web Corporativo

Sitio web para **Moto-Bombas y Reductores Jordan S.A. de C.V.**, especialistas en sistemas de bombeo, transmisión de potencia y motores eléctricos en San Juan del Río, Querétaro.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Estilos:** Tailwind CSS 4 + variables CSS personalizadas (tokens de marca)
- **Base de datos:** Prisma + PostgreSQL (Neon)
- **Almacenamiento de imágenes:** Vercel Blob
- **Autenticación:** JWT con cookie HttpOnly (`/api/auth`)
- **Tipografías:** Saira Condensed, Archivo, Space Mono (Google Fonts)
- **Analíticas:** Vercel Analytics + Google Tag Manager

## Levantar en desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
# PostgreSQL (Neon) — formato: postgresql://user:password@host/dbname?sslmode=require
DATABASE_URL="postgresql://..."

# Autenticación admin
ADMIN_PASSWORD="tu_contraseña_segura"
JWT_SECRET="cadena_aleatoria_larga_min_32_chars"

# Vercel Blob (para subir imágenes desde el admin)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

## Deploy en Vercel

### 1. Base de datos — Neon (PostgreSQL gratis)

1. Crea cuenta en [neon.tech](https://neon.tech)
2. Crea un proyecto nuevo → copia el **Connection String**
3. Pégalo como `DATABASE_URL` en Vercel → Settings → Environment Variables
4. Corre las migraciones: `pnpm prisma db push`

### 2. Almacenamiento de imágenes — Vercel Blob

1. En el dashboard de Vercel → tu proyecto → **Storage** → **Create Database** → **Blob**
2. Vercel agrega `BLOB_READ_WRITE_TOKEN` automáticamente a las env vars del proyecto

### 3. Variables de entorno en Vercel

En **Settings → Environment Variables** agrega:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | Connection string de Neon |
| `ADMIN_PASSWORD` | Tu contraseña del admin |
| `JWT_SECRET` | Cadena aleatoria (mín. 32 caracteres) |
| `BLOB_READ_WRITE_TOKEN` | Lo agrega Vercel Blob automáticamente |

### 4. Deploy

```bash
# Con Vercel CLI
pnpm dlx vercel --prod

# O conecta el repo en vercel.com y hace auto-deploy en cada push a main
```

## Base de datos (local)

```bash
# Aplicar schema al DB
pnpm db:push

# Explorar datos en el navegador
pnpm db:studio

# Regenerar cliente Prisma después de cambios al schema
pnpm db:generate
```

## Panel de administración

Accede en `/admin`. Requiere autenticación con `ADMIN_PASSWORD`.

### Secciones del admin

| Sección | Ruta | Descripción |
|---|---|---|
| Dashboard | `/admin` | Estadísticas y accesos rápidos |
| Banners | `/admin/banners` | Carrusel principal de la página |
| Catálogo | `/admin/catalogo` | Productos destacados |
| Promociones | `/admin/promociones` | Ofertas y descuentos |
| Galería | `/admin/galeria` | Fotos de instalaciones y equipos |
| Artículos | `/admin/articulos` | Blog y noticias |
| Reseñas | `/admin/resenas` | Reseñas y propuestas de clientes |
| Guía | `/admin/guia` | Manual de uso del panel |

### Flujo de reseñas

Las reseñas tienen 3 estados:
- **PENDIENTE** — sin revisar
- **REVISADA · NO PUBLICADA** — vista por el admin, no aparece en el sitio
- **PUBLICADA** — visible en la sección de testimonios

## Estructura del proyecto

```
src/
├── app/
│   ├── page.jsx          # Página principal pública
│   ├── layout.jsx        # Layout raíz (metadatos, fonts, GTM)
│   ├── globals.css       # Tokens de marca, utilidades CSS
│   ├── admin/            # Panel de administración
│   └── api/              # API Routes (REST)
├── components/
│   ├── sections/         # Secciones dinámicas de la página
│   ├── admin/            # Componentes del panel admin
│   └── interface/        # Componentes UI compartidos
├── lib/
│   ├── db.js             # Cliente Prisma singleton
│   ├── auth.js           # Lógica JWT / sesión
│   └── fmt.js            # Helpers de formato de fecha
└── middleware.js          # Protección de rutas /admin
```

## Scripts disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm db:push      # Aplicar schema a la BD
pnpm db:studio    # Prisma Studio (explorador de BD)
```

## Notas sobre imágenes estáticas del catálogo

Las carpetas `public/marcas/`, `public/motores/`, `public/bombas/` y `public/refacciones/` contienen imágenes del catálogo comprometidas en el repositorio. Se sirven directamente desde Next.js y no requieren Vercel Blob.

Solo las imágenes **subidas desde el admin** (banners, galería, promociones, artículos, productos) se almacenan en Vercel Blob.
