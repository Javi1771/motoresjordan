"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import Servicios from '../components/Servicios';
import Contacto from '../components/Contacto';
import Nosotros from '../components/Nosotros';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: "25+", label: "Años de experiencia" },
    { number: "500+", label: "Proyectos completados" },
    { number: "100%", label: "Satisfacción garantizada" },
    { number: "24/7", label: "Soporte técnico" }
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, me interesa solicitar una cotización para equipos de bombeo. ¿Podrían ayudarme?');
    window.open(`https://wa.me/524423919520?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:contacto@motoresjordanmx.com?subject=Solicitud de Cotización&body=Hola, me interesa solicitar una cotización para equipos de bombeo. Por favor contáctenme.', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-[#000000] bg-opacity-95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold">Jordan</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-[#BE171F] transition-colors">Servicios</a>
              <a href="#about" className="hover:text-[#BE171F] transition-colors">Nosotros</a>
              <a href="#contact" className="hover:text-[#BE171F] transition-colors">Contacto</a>
              <button 
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Cotizar
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#000000] bg-opacity-95 backdrop-blur-sm">
            <div className="px-6 py-4 space-y-4">
              <a href="#services" className="block hover:text-[#BE171F] transition-colors">Servicios</a>
              <a href="#about" className="block hover:text-[#BE171F] transition-colors">Nosotros</a>
              <a href="#contact" className="block hover:text-[#BE171F] transition-colors">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#262626] to-[#BE171F]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-4xl font-bold text-white">J</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Moto-Bombas y Reductores
            <br />
            <span className="text-[#BE171F]">Jordan S.A de C.V.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#8E8F91] mb-8 max-w-2xl mx-auto">
            Potenciando el bombeo, control y potencia de tus proyectos con 
            <span className="text-[#BE171F] font-semibold"> tecnología de vanguardia</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleWhatsApp}
              className="bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300"
            >
              <span className="flex items-center">
                Contáctanos por WhatsApp
                <MessageCircle className="ml-2" size={20} />
              </span>
            </button>
            <button
              onClick={handleEmailContact}
              className="border-2 border-[#8E8F91] px-8 py-4 rounded-full text-[#8E8F91] font-semibold hover:bg-[#8E8F91] hover:text-white transition-all duration-300"
            >
              Cotizar por Email
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#BE171F] mb-2">{stat.number}</div>
                <div className="text-sm text-[#8E8F91]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Components */}
      <Servicios />
      <Nosotros />
      <Contacto />

      {/* Footer */}
      <footer className="bg-[#000000] border-t border-[#4E4F50] py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-2xl font-bold text-white">Moto-Bombas y Reductores Jordan S.A de C.V.</span>
            </div>
            <p className="text-[#8E8F91] mb-6">
              Potenciando el bombeo, control y potencia de tus proyectos desde 1999
            </p>
            <div className="flex justify-center space-x-6 text-[#8E8F91]">
              <a href="#services" className="hover:text-[#BE171F] transition-colors">Servicios</a>
              <a href="#about" className="hover:text-[#BE171F] transition-colors">Nosotros</a>
              <a href="#contact" className="hover:text-[#BE171F] transition-colors">Contacto</a>
            </div>
            <div className="mt-8 pt-8 border-t border-[#4E4F50] text-[#6B6C6F]">
              <p>&copy; 2025 Moto-Bombas y Reductores Jordan S.A de C.V. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}