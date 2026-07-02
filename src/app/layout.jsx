import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

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
    "reparación de motores",
    "reductores industriales",
    "variadores de frecuencia",
    "moto-bombas jordan",
  ],
  authors: [{ name: "Motores Jordan" }],
  creator: "Motores Jordan",
  publisher: "Motores Jordan",
  category: "Servicios Industriales",
  metadataBase: new URL("https://motoresjordanmx.com"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://motoresjordanmx.com",
    siteName: "Motores Jordan",
    title: "Motores Jordan - Sistemas de Bombeo y Transmisión de Potencia",
    description:
      "Especialistas en sistemas de bombeo, transmisión de potencia y motores eléctricos en San Juan del Río, Querétaro. Más de 15 años de experiencia.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Motores Jordan - Sistemas de Bombeo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motores Jordan - Sistemas de Bombeo",
    description: "Especialistas en sistemas de bombeo y transmisión de potencia en San Juan del Río, Querétaro.",
    images: ["/logo.jpg"],
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
    "geo.position": "20.3917469;-99.9957687",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Moto-Bombas y Reductores Jordan S.A. de C.V.",
    alternateName: "Motores Jordan",
    image: "https://motoresjordanmx.com/logo.jpg",
    "@id": "https://motoresjordanmx.com",
    url: "https://motoresjordanmx.com",
    telephone: ["+52-427-272-4036", "+52-427-101-1168"],
    email: "contacto@motoresjordanmx.com",
    priceRange: "$$",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "C. José María Morelos 126-C",
        addressLocality: "San Juan del Río",
        addressRegion: "Querétaro",
        postalCode: "76800",
        addressCountry: "MX",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Plaza de las Naciones Prol. Av. México No. 5-1 Local 11, Parque Industrial Nuevo San Juan",
        addressLocality: "San Juan del Río",
        addressRegion: "Querétaro",
        postalCode: "76806",
        addressCountry: "MX",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.3917469,
      longitude: -99.9957687,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    sameAs: [],
  };

  return (
    <html lang="es-MX" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Archivo:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
        />
        {/* Inject theme before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('mj-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0a0a0a" />
        <meta httpEquiv="content-language" content="es-MX" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-nav">
          Saltar al contenido principal
        </a>
        <Analytics />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M28WG51MMC"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11120599318"
          strategy="afterInteractive"
        />
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
