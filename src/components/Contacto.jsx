import React, { useState, useEffect } from "react";
import {
  Send,
  Users,
  Mail,
  Award,
  Shield,
  Headphones,
  Copy,
  CheckCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Direccion from "./interface/Direccion";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email no es válido";
    }

    if (!formData.phone.trim()) {
      errors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "El teléfono debe tener exactamente 10 dígitos";
    }

    if (!formData.message.trim()) {
      errors.message = "El mensaje es requerido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleWhatsApp = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const message =
        encodeURIComponent(`Hola, solicito cotización para equipos de bombeo.

*Datos del Cliente:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

*Mensaje:*
${formData.message}

Gracias por su atención.`);

      window.open(`https://wa.me/524423919520?text=${message}`, "_blank");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleEmailContact = () => {
    if (!validateForm()) return;

    const subject = `Solicitud de Cotización - ${formData.name}`;
    const body = `Estimado equipo de Motores Jordan,

Solicito cotización para equipos de bombeo.

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

Quedo en espera de su respuesta.

Saludos cordiales,
${formData.name}`;

    setIsSubmitting(true);

    //* Intentar abrir cliente de correo por defecto
    const mailtoLink = `mailto:contacto@motoresjordanmx.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      try {
        window.location.href = mailtoLink;
      } catch (error) {
        console.log("Error al abrir cliente de correo:", error);
      }

      //* Mostrar opciones alternativas después de un momento
      setTimeout(() => {
        setShowEmailOptions(true);
      }, 1000);

      setIsSubmitting(false);
    }, 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const openGmail = () => {
    const subject = `Solicitud de Cotización - ${formData.name}`;
    const body = `Estimado equipo de Motores Jordan,

Solicito cotización para equipos de bombeo.

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

Quedo en espera de su respuesta.

Saludos cordiales,
${formData.name}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=contacto@motoresjordanmx.com&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  const openOutlook = () => {
    const subject = `Solicitud de Cotización - ${formData.name}`;
    const body = `Estimado equipo de Motores Jordan,

Solicito cotización para equipos de bombeo.

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

Quedo en espera de su respuesta.

Saludos cordiales,
${formData.name}`;

    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=contacto@motoresjordanmx.com&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(outlookUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#1a1a1a] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(190,23,31,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,63,72,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(190,23,31,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Email Options Modal */}
      {showEmailOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#262626] to-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#4E4F50]/50">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Opciones de Envío
            </h3>
            <p className="text-[#8E8F91] mb-6 text-center">
              Elige cómo prefieres enviar tu mensaje:
            </p>

            <div className="space-y-4">
              <button
                onClick={openGmail}
                className="w-full bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#BE171F]/25 transition-all duration-300 flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Abrir en Gmail
              </button>

              <button
                onClick={openOutlook}
                className="w-full bg-gradient-to-r from-[#0078d4] to-[#106ebe] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Abrir en Outlook
              </button>

              <button
                onClick={() => copyToClipboard("contacto@motoresjordanmx.com")}
                className="w-full bg-gradient-to-r from-[#8E8F91] to-[#6B6C6F] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copiar Email
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowEmailOptions(false)}
              className="w-full mt-6 px-6 py-3 rounded-lg border border-[#4E4F50] text-[#8E8F91] font-semibold hover:bg-[#4E4F50]/20 transition-all duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        {/* Header Section */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 text-white">
              Contáctanos
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#8E8F91] leading-relaxed">
              Expertos en soluciones de bombeo industrial con más de 15 años de
              experiencia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* Contact Info */}
          <Direccion />

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-[#262626]/90 to-[#1a1a1a]/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-[#4E4F50]/50 hover:border-[#BE171F]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#BE171F]/10">
              <div className="flex items-center mb-6 lg:mb-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#BE171F] to-[#F43F48] rounded-lg lg:rounded-xl flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  Solicita una Cotización
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[#D0D0D1] font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1a1a1a]/80 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BE171F] focus:border-transparent transition-all duration-200 ${
                      formErrors.name ? "border-red-500" : "border-[#6B6C6F]"
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#D0D0D1] font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1a1a1a]/80 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BE171F] focus:border-transparent transition-all duration-200 ${
                      formErrors.email ? "border-red-500" : "border-[#6B6C6F]"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#D0D0D1] font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1a1a1a]/80 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BE171F] focus:border-transparent transition-all duration-200 ${
                      formErrors.phone ? "border-red-500" : "border-[#6B6C6F]"
                    }`}
                    placeholder="+52 442 123 4567"
                  />
                  {formErrors.phone && (
                    <p className="text-red-400 text-sm mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#D0D0D1] font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#1a1a1a]/80 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#BE171F] focus:border-transparent transition-all duration-200 resize-none ${
                      formErrors.message ? "border-red-500" : "border-[#6B6C6F]"
                    }`}
                    placeholder="Describe tu proyecto, tipo de equipo requerido, especificaciones técnicas..."
                  />
                  {formErrors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#BE171F]/25 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <FaWhatsapp className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailContact}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#8E8F91] to-[#6B6C6F] hover:from-[#6B6C6F] hover:to-[#4E4F50] px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Mail className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Enviando..." : "Enviar por Email"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
