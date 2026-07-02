import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    const promocion = await prisma.promocion.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo?.trim(),
        descripcion: data.descripcion?.trim() || null,
        descuento: data.descuento != null ? parseFloat(data.descuento) : null,
        imagen: data.imagen?.trim() || null,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : null,
        activa: data.activa !== false,
      },
    });
    return NextResponse.json(promocion);
  } catch {
    return NextResponse.json({ error: "Error al actualizar." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    await prisma.promocion.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar." }, { status: 500 });
  }
}
