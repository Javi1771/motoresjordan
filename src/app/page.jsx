"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaIndustry, FaHandsHelping, FaImages, FaPhoneAlt, FaLeaf, FaCog, FaBolt, FaWater } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121213] text-[#F5F5F6] overflow-hidden font-sans">

      {/* Fondo con engranes gigantes girando */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute -top-64 -left-64 w-[1000px] h-[1000px] opacity-10 z-0"
      >
        <Image
          src="/04858583-aab9-47f2-8475-44e93fc138df.png"
          alt="Fondo engranes"
          fill
          style={{ objectFit: "contain" }}
          className="blur-sm"
        />
      </motion.div>

      {/* Grid overlay futurista */}
      <div className="absolute inset-0 bg-[radial-gradient(#6E6F71_1px,transparent_1px)] [background-size:20px_20px] opacity-5 z-0 animate-pulse"></div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6 backdrop-blur-xl bg-[#222223]/30 border-b border-[#6E6F71]/20">
        <Image src="/logo.jpg" alt="Logo Jordan" width={100} height={80} className="rounded-md shadow-xl" />
        <nav className="flex gap-8">
          <Link href="/quienes-somos">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-2 text-[#F5F5F6] hover:text-[#F43F48] transition duration-300"
            >
              <FaHandsHelping /> Quiénes Somos
            </motion.div>
          </Link>
          <Link href="/contacto">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-2 text-[#F5F5F6] hover:text-[#F43F48] transition duration-300"
            >
              <FaPhoneAlt /> Contacto
            </motion.div>
          </Link>
          <Link href="/galeria-proveedores">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-2 text-[#F5F5F6] hover:text-[#F43F48] transition duration-300"
            >
              <FaImages /> Galería
            </motion.div>
          </Link>
        </nav>
      </header>

      {/* Hero principal */}
      <section className="relative z-20 flex flex-col md:flex-row items-center justify-center flex-grow p-12 gap-16">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="bg-[#F5F5F6]/10 border border-[#FC6D74]/30 rounded-3xl p-8 shadow-[0_0_30px_#F43F48] backdrop-blur-xl max-w-xl"
        >
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#F43F48] via-[#BE171F] to-[#47080B] bg-clip-text text-transparent flex items-center gap-4">
            <FaIndustry className="text-[#F43F48] animate-pulse" /> Jordan
          </h1>
          <p className="text-lg text-[#E6E6E7] mb-8">
            Bombas, reductores y sistemas que impulsan el futuro. Control total de potencia y eficiencia energética.
          </p>
          <Link href="/contacto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-8 py-4 bg-[#E22029] text-white rounded-xl shadow-[0_0_20px_#F43F48] hover:bg-[#9D171D] transition"
            >
              Contáctanos
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex justify-center"
        >
          <Image
            src="/PORTADA_JORDAN_sin_fondo.png"
            alt="Portada Jordan"
            width={420}
            height={420}
            className="drop-shadow-[0_0_30px_#F43F48]"
          />
        </motion.div>
      </section>

      {/* Section ambiental super glass */}
      <section className="relative z-20 flex flex-col items-center justify-center gap-4 py-14 px-4">
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, type: "spring" }}
          className="p-6 bg-[#F5F5F6]/10 border border-[#8E8F91]/30 backdrop-blur-xl rounded-2xl shadow-[0_0_20px_#6E6F71]"
        >
          <Image
            src="/triangulo_sin_fondo.png"
            alt="Triángulo"
            width={120}
            height={120}
            className="mb-4"
          />
        </motion.div>
        <h2 className="text-3xl font-bold flex items-center gap-3 bg-gradient-to-r from-[#F43F48] to-[#BE171F] bg-clip-text text-transparent animate-pulse">
          <FaLeaf /> Ahorro de agua y energía
        </h2>
        <p className="text-[#D0D0D1] max-w-2xl text-center">
          Con tecnología avanzada reducimos consumos y elevamos la productividad. Comprometidos con el medio ambiente y el ahorro energético.
        </p>
      </section>

      {/* Footer potente */}
      <footer className="relative z-20 bg-[#222223]/90 backdrop-blur-xl border-t border-[#6E6F71]/20 py-4 text-center text-[#F5F5F6]">
        <div className="flex justify-center gap-6 text-xl mb-2">
          <FaCog className="animate-spin-slow" />
          <FaBolt className="animate-ping text-[#F43F48]" />
          <FaWater className="animate-bounce" />
        </div>
        © {new Date().getFullYear()} Moto Bombas y Reductores Jordán S.A. de C.V. • Todos los derechos reservados
      </footer>
    </main>
  );
}
