// Servicios.js
import React from "react";
import { SiGoogleearthengine } from "react-icons/si";
import ProveedoresCarousel from "./interface/ProveedoresCarousel";

export default function Servicios() {
  const services = [
    {
      title: "Tanques Hidroneumáticos",
      description:
        "Sistemas de presión constante para aplicaciones industriales y residenciales con tecnología de vanguardia",
      image: "/Tanque_hidroneumatico.png",
      alt: "Tanque Hidroneumático",
      features: ["Presión constante", "Ahorro energético", "Larga durabilidad"],
      color: "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
      shadowColor: "shadow-red-500/20",
    },
    {
      title: "Motores Baldor",
      description:
        "Motores eléctricos de alta eficiencia para todas tus necesidades industriales más exigentes",
      image: "/Motor_baldor.png",
      alt: "Motor Baldor",
      features: [
        "Alta eficiencia",
        "Bajo mantenimiento",
        "Tecnología avanzada",
      ],
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
      shadowColor: "shadow-blue-500/20",
    },
    {
      title: "Soluciones Industriales",
      description:
        "Equipamiento completo para la industria de bebidas y procesos con asesoría especializada",
      image: "/industria_bebidas.png",
      alt: "Industria Bebidas",
      features: [
        "Soluciones integrales",
        "Asesoría técnica",
        "Instalación profesional",
      ],
      color: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
      shadowColor: "shadow-amber-500/20",
    },
  ];

  const providers = [
    "aquapak.jpg",
    "aro.png",
    "barnes.jpg",
    "Bell_Gossett_rgb.jpg",
    "bonasa.jpg",
    "goulds.jpg",
    "grundfos.jpg",
    "LittleGiant.jpg",
    "Logo-Evans-600.png",
    "mann_pumps.png",
    "Myers_Logo.png",
    "nord_drive_systems.jpg",
    "OIP.jpg",
    "oli-logo.png",
    "Pedrollo.png",
    "q_pumps.png",
    "sumitomo.jpg",
    "trasnstecno.jpg",
    "us_motors.jpg",
    "wdm-pumms.png",
    "weg-logo.png",
    "Yamada.jpg",
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Elementos decorativos mejorados */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/5 via-transparent to-blue-600/5"></div>
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-red-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-600/5 blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
              NUESTROS SERVICIOS
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Soluciones{" "}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Industriales
            </span>
            <br />
            de Primera Clase
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Equipamiento de vanguardia y soluciones integrales para todas tus
            necesidades industriales, incluyendo armado de bombas y visitas de
            campo, respaldado por la experiencia y calidad que tu empresa
            merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-b from-[#1f1f1f] to-[#0f0f0f] rounded-3xl p-8 transition-all duration-700 border border-[#333] hover:border-red-500/50 hover:shadow-2xl ${service.shadowColor} hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
            >
              {/* Efectos de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>

              {/* Borde superior brillante */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Icono y imagen container */}
              <div className="relative mb-8">
                {/* Imagen del servicio con mejor presentación */}
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#3a3a3a] group-hover:border-red-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white text-center group-hover:text-red-400 transition-colors duration-500">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-8 text-center leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                {service.description}
              </p>

              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] py-3 px-5 rounded-xl border border-[#333] group-hover:border-red-500/30 transition-all duration-500 transform hover:translate-x-2"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mr-4 bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full shadow-lg">
                      <SiGoogleearthengine className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-200 font-medium flex-1">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sección de proveedores con carrusel premium */}
        <div className="mt-32 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

          <div className="text-center mb-16 pt-12">
            <div className="inline-block mb-6">
              <span className="text-sm font-medium text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                NUESTROS SOCIOS
              </span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-6">
              Trabajamos con las{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                mejores marcas
              </span>
            </h3>
            <p className="text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
              Más de 20 proveedores líderes en el mercado respaldan nuestros
              servicios con equipos de la más alta calidad y tecnología de
              vanguardia.
            </p>
          </div>

          {/* Usamos el componente de carrusel */}
          <ProveedoresCarousel providers={providers} />
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, -5px) rotate(5deg);
          }
          50% {
            transform: translate(10px, 5px) rotate(-5deg);
          }
          75% {
            transform: translate(-5px, 10px) rotate(3deg);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-8px, 5px) rotate(-3deg);
          }
          50% {
            transform: translate(5px, -8px) rotate(2deg);
          }
          75% {
            transform: translate(-10px, -5px) rotate(-2deg);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(7px, 10px) rotate(1deg);
          }
          50% {
            transform: translate(-7px, -10px) rotate(-1deg);
          }
          75% {
            transform: translate(10px, -7px) rotate(4deg);
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}