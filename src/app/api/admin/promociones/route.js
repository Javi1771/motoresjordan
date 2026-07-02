import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const promociones = await prisma.promocion.findMany({
    orderBy: { creadoEn: "desc" },
  });
  return NextResponse.json(promociones);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.titulo?.trim()) {
      return NextResponse.json({ error: "El título es requerido." }, { status: 400 });
    }
    const promocion = await prisma.promocion.create({
      data: {
        titulo: data.titulo.trim(),
        descripcion: data.descripcion?.trim() || null,
        descuento: data.descuento ? parseFloat(data.descuento) : null,
        imagen: data.imagen?.trim() || null,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : null,
        activa: data.activa !== false,
      },
    });
    return NextResponse.json(promocion, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al crear promoción." }, { status: 500 });
  }
}
