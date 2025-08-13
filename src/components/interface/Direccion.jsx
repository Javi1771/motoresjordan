import React from "react";
import { MapPin, Phone, Mail, Truck } from "lucide-react";

const Direccion = () => {
  // URLs de Google Maps para cada sucursal
  const sucursal1Map =
    "https://www.google.com.mx/maps/place/Moto-Bombas+y+Reductores+Jordan+S.A+de+C.V./@20.3917469,-99.9957687,935m/data=!3m3!1e3!4b1!5s0x85d30b628732a6ab:0xac2f3bcd1e252bed!4m6!3m5!1s0x85d30b6280a9afff:0x80a19ba652dc9adb!8m2!3d20.391747!4d-99.9908978!16s%2Fg%2F11bx89x828?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";

  const sucursal2Map =
    "https://www.google.com.mx/maps/@20.366105,-99.9574319,3a,75y,144.67h,92.4t/data=!3m7!1e1!3m5!1s0WbjlgXpECyG4Ch1diDCIw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.4039200749683403%26panoid%3D0WbjlgXpECyG4Ch1diDCIw%26yaw%3D144.66835371465618!7i16384!8i8192?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="bg-gradient-to-br from-[#262626]/90 to-[#1a1a1a]/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-[#4E4F50]/50 hover:border-[#BE171F]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#BE171F]/10">
      <div className="flex items-center mb-6 lg:mb-8">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#BE171F] to-[#F43F48] rounded-lg lg:rounded-xl flex items-center justify-center mr-4">
          <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-white">
          Información de Contacto
        </h3>
      </div>

      <div className="space-y-8">
        {/* Mensaje de envíos nacionales */}
        <div className="bg-gradient-to-r from-[#BE171F]/20 to-[#F43F48]/10 rounded-xl p-4 border border-[#BE171F]/30 flex items-center">
          <div className="bg-[#BE171F] p-2 rounded-lg mr-4">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Cobertura Nacional</h4>
            <p className="text-[#D0D0D1] mt-1">
              Envío a toda la República Mexicana mediante fleteras
            </p>
          </div>
        </div>

        {/* Sucursal 1 */}
        <div className="bg-[#1a1a1a]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#BE171F]/20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative group">
              <a
                href={sucursal1Map}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
                title="Ver ubicación en Google Maps"
              >
                <img
                  src="/direccion1.jpg"
                  alt="Sucursal Centro"
                  className="w-full h-56 object-cover transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-2 transition-opacity duration-300 opacity-90 hover:opacity-100">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </a>
            </div>
            <div className="p-4 md:w-3/5">
              <h4 className="font-semibold text-white mb-3 text-lg">
                Sucursal Centro
              </h4>

              <div className="flex items-start space-x-3 mb-3">
                <MapPin className="w-5 h-5 text-[#BE171F] mt-1 flex-shrink-0" />
                <p className="text-[#8E8F91] leading-relaxed">
                  C. José María Morelos 126-C, Centro
                  <br />
                  76800 San Juan del Río, Qro.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#BE171F] flex-shrink-0" />
                <a
                  href="tel:4272724036"
                  className="text-[#8E8F91] hover:text-[#F43F48] transition-colors"
                >
                  427 272 4036
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sucursal 2 */}
        <div className="bg-[#1a1a1a]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#BE171F]/20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative group">
              <a
                href={sucursal2Map}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
                title="Ver ubicación en Google Maps"
              >
                <img
                  src="/direccion2.jpg"
                  alt="Parque Industrial Nuevo San Juan"
                  className="w-full h-56 object-cover transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-2 transition-opacity duration-300 opacity-90 hover:opacity-100">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </a>
            </div>
            <div className="p-4 md:w-3/5">
              <h4 className="font-semibold text-white mb-3 text-lg">
                Sucursal Parque Industrial
              </h4>

              <div className="flex items-start space-x-3 mb-3">
                <MapPin className="w-5 h-5 text-[#BE171F] mt-1 flex-shrink-0" />
                <p className="text-[#8E8F91] leading-relaxed">
                  Plaza de las Naciones Prol. Av. México No. Ext. 5-1
                  <br />
                  Local 11, Parque Industrial Nuevo San Juan
                  <br />
                  C.P. 76806, San Juan del Río, Querétaro
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#BE171F] flex-shrink-0" />
                <a
                  href="tel:4271011168"
                  className="text-[#8E8F91] hover:text-[#F43F48] transition-colors"
                >
                  427 101 1168
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Email común */}
        <div className="bg-gradient-to-r from-[#BE171F]/20 to-[#F43F48]/10 rounded-xl p-4 border border-[#BE171F]/30 flex items-center">
          <div className="bg-[#BE171F] p-2 rounded-lg mr-4 flex-shrink-0">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-white text-lg sm:text-lg text-sm leading-tight">
              Email Corporativo
            </h4>
            <a
              href="mailto:contacto@motoresjordanmx.com"
              className="text-[#D0D0D1] mt-1 hover:text-[#F43F48] transition-colors block truncate text-sm sm:text-base"
              title="contacto@motoresjordanmx.com"
            >
              contacto@motoresjordanmx.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Direccion;
