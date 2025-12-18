// app/layout.jsx
import { Analytics } from '@vercel/analytics/react'; // Importa Analytics

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
        {/* Agrega Analytics aquí */}
        <Analytics />
      </body>
    </html>
  );
}