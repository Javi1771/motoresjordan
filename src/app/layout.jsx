// app/layout.jsx
import './globals.css'

export const metadata = {
  title: 'Motores Jordán | Soluciones Industriales',
  description: 'Expertos en motores eléctricos, reductores y productos industriales',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}