import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contacto() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, me interesa solicitar una cotización para equipos de bombeo. ¿Podrían ayudarme?');
    window.open(`https://wa.me/524423919520?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:contacto@motoresjordanmx.com?subject=Solicitud de Cotización&body=Hola, me interesa solicitar una cotización para equipos de bombeo. Por favor contáctenme.', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#000000]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Contáctanos
          </h2>
          <p className="text-xl text-[#8E8F91]">
            Estamos aquí para ayudarte con tu próximo proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#262626] bg-opacity-50 rounded-2xl p-8 border border-[#4E4F50]">
              <h3 className="text-2xl font-bold mb-6 text-white">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Dirección</h4>
                    <p className="text-[#8E8F91]">C. José María Morelos 126-C, Centro<br />76800 San Juan del Río, Qro.</p>
                  </div>
                </div>
                
                {/* <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Teléfono</h4>
                    <p className="text-[#8E8F91]">+52 442 391 9520</p>
                  </div>
                </div> */}
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-[#8E8F91]">contacto@motoresjordanmx.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-[#262626] bg-opacity-50 rounded-2xl p-8 border border-[#4E4F50]">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Horario de Atención</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#8E8F91]">Lunes - Viernes</span>
                  <span className="text-white font-semibold">8:15 AM - 5:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8E8F91]">Sábado</span>
                  <span className="text-white font-semibold">8:15 AM - 1:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8E8F91]">Domingo</span>
                  <span className="text-[#BE171F] font-semibold">Cerrado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#262626] bg-opacity-50 rounded-2xl p-8 border border-[#4E4F50]">
            <h3 className="text-2xl font-bold mb-6 text-white">Solicita una Cotización</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#D0D0D1] mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#4E4F50] bg-opacity-50 border border-[#6B6C6F] rounded-lg text-white focus:outline-none focus:border-[#BE171F] transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-[#D0D0D1] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[#4E4F50] bg-opacity-50 border border-[#6B6C6F] rounded-lg text-white focus:outline-none focus:border-[#BE171F] transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-[#D0D0D1] mb-2">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-[#4E4F50] bg-opacity-50 border border-[#6B6C6F] rounded-lg text-white focus:outline-none focus:border-[#BE171F] transition-colors"
                  placeholder="+52 442 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-[#D0D0D1] mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-[#4E4F50] bg-opacity-50 border border-[#6B6C6F] rounded-lg text-white focus:outline-none focus:border-[#BE171F] transition-colors resize-none"
                  placeholder="Describe tu proyecto o necesidad..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar por WhatsApp
                </button>
                <button
                  className="flex-1 bg-[#8E8F91] hover:bg-[#6B6C6F] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center"
                  onClick={handleEmailContact}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar por Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}