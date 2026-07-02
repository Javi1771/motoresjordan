import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = RATE_LIMIT.get(ip) ?? { count: 0, start: now };
  if (now - record.start > WINDOW_MS) {
    RATE_LIMIT.set(ip, { count: 1, start: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS) return false;
  RATE_LIMIT.set(ip, { ...record, count: record.count + 1 });
  return true;
}

function sanitize(str) {
  return String(str ?? "").trim().replace(/<[^>]*>/g, "");
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiados mensajes. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const nombre = sanitize(body.nombre ?? body.name);
    const email = sanitize(body.email);
    const telefono = sanitize(body.telefono ?? body.phone);
    const mensaje = sanitize(body.mensaje ?? body.message);

    if (!nombre || !email || !telefono || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(telefono.replace(/\D/g, ""))) {
      return NextResponse.json(
        { error: "Teléfono debe tener 10 dígitos." },
        { status: 400 }
      );
    }

    if (mensaje.length > 2000) {
      return NextResponse.json(
        { error: "Mensaje demasiado largo." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Motores Jordan <contacto@motoresjordanmx.com>",
      to: [process.env.RESEND_TO ?? "josemedellin@motoresjordanmx.com"],
      replyTo: email,
      subject: `Nueva solicitud de cotización - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #BE171F; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nueva Solicitud de Cotización</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Motores Jordan — motoresjordanmx.com</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #555; font-weight: bold; width: 120px;">Nombre:</td>
                <td style="padding: 8px 0; color: #111;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #BE171F;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-weight: bold;">Teléfono:</td>
                <td style="padding: 8px 0; color: #111;">${telefono}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <h3 style="color: #333; margin: 0 0 8px;">Mensaje:</h3>
            <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 12px; text-align: center;">
            Enviado desde el formulario de contacto de motoresjordanmx.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar el correo. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
