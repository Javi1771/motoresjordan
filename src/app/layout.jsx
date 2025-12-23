// app/layout.jsx
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'; // Importar Script de Next.js

export const metadata = { 
  title: 'Motores Jordan - Sistemas de Bombeo',
  description: 'Soluciones profesionales en sistemas de bombeo y transmisión de potencia con tecnología de vanguardia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Meta tags adicionales para mejor SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-900 text-white font-inter">
        {children}
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Google Ads - Script externo */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11120599318"
          strategy="afterInteractive"
        />
        
        {/* Google Ads - Configuración */}
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11120599318');
          `}
        </Script>
      </body>
    </html>
  );
}