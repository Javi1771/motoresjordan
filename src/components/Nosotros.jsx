import React, { useState } from "react";
import {
  Zap,
  Shield,
  Wrench,
  Star,
  Users,
  Award,
  Clock,
  Target,
  Heart,
  TrendingUp,
  CheckCircle,
  Factory,
} from "lucide-react";
import { PiGearBold } from "react-icons/pi";

export default function Nosotros() {
  const [activeCard, setActiveCard] = useState(null);

  const contentCards = [
    {
      id: 1,
      icon: Users,
      title: "Trabajo Cooperativo",
      content:
        "Creemos que el trabajo cooperativo y el conocimiento compartido son las claves del éxito.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 2,
      icon: Factory,
      title: "Especialistas Industriales",
      content:
        "Somos especialistas en motores eléctricos y reductores para diferentes sectores.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 3,
      icon: Award,
      title: "Calidad Premium",
      content:
        "Trabajamos con altos estándares de calidad, refacciones genuinas y marcas líderes para ofrecer el mejor servicio a precios competitivos.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 4,
      icon: Target,
      title: "Sectores Diversos",
      content:
        "Nuestros productos van dirigidos a cualquier sector: farmacéutico, comercial, reventa y residencial.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 5,
      icon: Clock,
      title: "Servicio Rápido",
      content: "Para mantenimiento y entregas express.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 6,
      icon: Heart,
      title: "Compromiso Total",
      content:
        "Nuestro objetivo es ser recomendados por la excelencia de nuestro mantenimiento y atención al cliente.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 7,
      icon: TrendingUp,
      title: "Productos Premium",
      content:
        "Ofrecemos motores AC/DC, reductores, variadores, compresores, filtros, hidroneumáticos y sistemas contra incendio.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 8,
      icon: CheckCircle,
      title: "Satisfacción Garantizada",
      content:
        "Atención personalizada y cartera de clientes satisfechos que respaldan nuestra calidad-precio-atención.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
    {
      id: 9,
      icon: PiGearBold,
      title: "Reductores IEC y NEMA",
      content:
        "Amplia variedad de reductores bajo norma IEC y NEMA, ideales para aplicaciones industriales exigentes.",
      color: "from-[#BE171F] to-[#F43F48]",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-r from-[#000] to-[#262626] overflow-hidden"
    >
      {/* Fondos decorativos */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-8 w-64 h-64 bg-[#BE171F] rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-8 w-72 h-72 bg-[#F43F48] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 relative">
            <div className="w-20 h-20 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center shadow-2xl">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full"></div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            ¿Por qué elegir Jordan?
          </h2>
          <p className="max-w-3xl mx-auto text-2xl text-[#D0D0D1] leading-relaxed">
            Con más de{" "}
            <span className="text-[#BE171F] font-bold">
              15 años de experiencia
            </span>
            , somos líderes en soluciones de bombeo industrial, transmisión de
            potencia y control industrial en San Juan del Río, Querétaro.
          </p>
        </div>

        {/* Grid interactiva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contentCards.map((card) => {
            const Icon = card.icon;
            const isActive = activeCard === card.id;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCard(card.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  isActive ? "scale-105 z-20" : "z-10"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                />
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${card.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3
                      className={`ml-4 text-xl font-bold text-white transition-colors duration-300 ${
                        isActive ? "text-[#BE171F]" : ""
                      }`}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[#D0D0D1] flex-grow leading-relaxed">
                    {card.content}
                  </p>
                  <div
                    className={`mt-4 h-1 rounded-full bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            {
              icon: Zap,
              title: "Tecnología Avanzada",
              text: "Equipos de última generación para máximo rendimiento",
            },
            {
              icon: Shield,
              title: "Garantía Total",
              text: "Respaldamos la calidad de nuestros productos y servicios",
            },
            {
              icon: Wrench,
              title: "Servicio Integral",
              text: "Desde la consultoría hasta el mantenimiento",
            },
            {
              icon: Star,
              title: "Experiencia Comprobada",
              text: "Ventas diarias y coadyuvando proyectos exitosos nos respaldan",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group flex items-start space-x-4 p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:scale-105 transition-transform duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="relative">
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F43F48] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[#8E8F91]">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Imagen + Stats */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#BE171F] to-[#F43F48] rounded-3xl blur-2xl opacity-30"></div>
            <div className="relative h-96 bg-gradient-to-br from-[#BE171F]/20 to-[#F43F48]/20 backdrop-blur-sm border border-gray-700/50 rounded-3xl flex items-center justify-center overflow-hidden">
              <div className="text-center z-10">
                <Wrench className="w-24 h-24 text-white mx-auto mb-4" />
                <p className="text-3xl font-bold text-white">Ingeniería</p>
                <p className="text-xl text-[#D0D0D1]">de Precisión</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { label: "2" , desc: "Sucursales" },
              { label: "15+ Años", desc: "Experiencia" },
              { label: "100%", desc: "Satisfacción" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl font-bold text-[#F43F48] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.label}
                </div>
                <div className="text-white text-lg">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
