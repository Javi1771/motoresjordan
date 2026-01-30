// app/layout.jsx
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata = {
  title: {
    default:
      "Motores Jordan - Sistemas de Bombeo y Transmisión de Potencia | San Juan del Río",
    template: "%s | Motores Jordan",
  },
  description:
    "Motores Jordan: Especialistas en sistemas de bombeo, transmisión de potencia, motores eléctricos y mantenimiento industrial en San Juan del Río, Querétaro. Más de 15 años de experiencia.",
  keywords: [
    "motores jordan",
    "sistemas de bombeo",
    "bombas industriales",
    "transmisión de potencia",
    "motores eléctricos",
    "mantenimiento industrial",
    "san juan del río",
    "querétaro",
    "equipos de bombeo",
    "reparación de motores",
  ],
  authors: [{ name: "Motores Jordan" }],
  creator: "Motores Jordan",
  publisher: "Motores Jordan",
  category: "Servicios Industriales",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://motoresjordanmx.com",
    siteName: "Motores Jordan",
    title: "Motores Jordan - Sistemas de Bombeo y Transmisión de Potencia",
    description:
      "Especialistas en sistemas de bombeo, transmisión de potencia y motores eléctricos en San Juan del Río, Querétaro.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Motores Jordan - Sistemas de Bombeo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://motoresjordanmx.com",
    languages: {
      "es-MX": "https://motoresjordanmx.com",
    },
  },
  other: {
    "geo.region": "MX-QUE",
    "geo.placename": "San Juan del Río",
    "geo.position": "20.3917469;-99.9957687,935",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Motores Jordan",
    image: "https://motoresjordanmx.com/logo.jpg",
    "@id": "https://motoresjordanmx.com",
    url: "https://motoresjordanmx.com",
    telephone: "+52-427-3762-379",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tu dirección aquí",
      addressLocality: "San Juan del Río",
      addressRegion: "QUE",
      postalCode: "76800",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.388611,
      longitude: -99.996111,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
  };

  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script src="https://cdn.tailwindcss.com"></script>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#111827" />
        <meta httpEquiv="content-language" content="es-MX" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="bg-gray-900 text-white font-inter">
        {/* Vercel Analytics */}
        <Analytics />

        {children}

        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M28WG51MMC"
          strategy="afterInteractive"
        />

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11120599318"
          strategy="afterInteractive"
        />

        {/* Google Tags Init (GA + Ads) */}
        <Script id="google-tags-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M28WG51MMC');
            gtag('config', 'AW-11120599318');
          `}
        </Script>
      </body>
    </html>
  );
}
