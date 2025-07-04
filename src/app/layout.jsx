// app/layout.jsx
export const metadata = { /* … */ }

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
      </head>
      <body className="bg-gray-900 text-white font-inter">
        {children}
      </body>
    </html>
  )
}
