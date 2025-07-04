import React from 'react';
import { Zap, Shield, Wrench, Star } from 'lucide-react';

export default function Nosotros() {
  return (
    <section id="about" className="py-20 bg-gradient-to-r from-[#000000] to-[#262626]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              ¿Por qué elegir Jordan?
            </h2>
            <p className="text-xl text-[#D0D0D1] mb-8">
              Con más de 25 años de experiencia, somos líderes en soluciones de bombeo y control industrial en San Juan del Río, Querétaro.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Tecnología Avanzada</h3>
                  <p className="text-[#8E8F91]">Equipos de última generación para máximo rendimiento</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Garantía Total</h3>
                  <p className="text-[#8E8F91]">Respaldamos la calidad de nuestros productos y servicios</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Servicio Integral</h3>
                  <p className="text-[#8E8F91]">Desde la consultoría hasta el mantenimiento</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Experiencia Comprobada</h3>
                  <p className="text-[#8E8F91]">500+ proyectos exitosos nos respaldan</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-[#BE171F] to-[#F43F48] bg-opacity-20 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <Wrench className="w-24 h-24 text-[#BE171F] mx-auto mb-4" />
                <p className="text-2xl font-bold text-white">Ingeniería</p>
                <p className="text-lg text-[#D0D0D1]">de Precisión</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}