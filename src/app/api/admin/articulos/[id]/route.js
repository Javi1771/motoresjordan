import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    const articulo = await prisma.articulo.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo?.trim(),
        slug: data.slug?.trim(),
        contenido: data.contenido?.trim(),
        imagen: data.imagen?.trim() || null,
        publicado: data.publicado === true,
      },
    });
    return NextResponse.json(articulo);
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Slug ya existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al actualizar." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    await prisma.articulo.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar." }, { status: 500 });
  }
}
