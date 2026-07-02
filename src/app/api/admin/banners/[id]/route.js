import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo?.trim() || null,
        imagen: data.imagen?.trim(),
        enlace: data.enlace?.trim() || null,
        orden: parseInt(data.orden ?? 0),
        activo: data.activo !== false,
      },
    });
    return NextResponse.json(banner);
  } catch {
    return NextResponse.json({ error: "Error al actualizar." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    await prisma.banner.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar." }, { status: 500 });
  }
}
