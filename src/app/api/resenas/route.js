import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: reseñas publicadas para el sitio público
export async function GET() {
  try {
    const data = await prisma.resena.findMany({
      where: { publicada: true, tipo: "resena" },
      orderBy: { creadoEn: "desc" },
      take: 12,
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST: envío público de reseña o propuesta
export async function POST(request) {
  try {
    const { nombre, email, mensaje, tipo = "resena", rating = 5 } = await request.json();

    if (!nombre?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Nombre y mensaje son requeridos." }, { status: 400 });
    }
    if (mensaje.length > 1000) {
      return NextResponse.json({ error: "El mensaje no puede superar 1000 caracteres." }, { status: 400 });
    }

    const clean = (s) => s?.replace(/<[^>]*>/g, "").slice(0, 500) ?? "";

    const resena = await prisma.resena.create({
      data: {
        nombre: clean(nombre),
        email: email?.trim().slice(0, 200) || null,
        mensaje: clean(mensaje),
        tipo: ["resena", "propuesta"].includes(tipo) ? tipo : "resena",
        rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
        publicada: false,
      },
    });

    return NextResponse.json({ ok: true, id: resena.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al guardar. Intenta de nuevo." }, { status: 500 });
  }
}
