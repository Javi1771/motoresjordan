import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const producto = await prisma.producto.findUnique({
    where: { id: params.id },
    include: { categoria: true },
  });
  if (!producto) return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  return NextResponse.json(producto);
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    const producto = await prisma.producto.update({
      where: { id: params.id },
      data: {
        nombre: data.nombre?.trim(),
        descripcion: data.descripcion?.trim() || null,
        precio: data.precio != null ? parseFloat(data.precio) : null,
        categoriaId: data.categoriaId || null,
        imagen: data.imagen?.trim() || null,
        activo: data.activo !== false,
        destacado: data.destacado === true,
        orden: parseInt(data.orden ?? 0),
      },
      include: { categoria: true },
    });
    return NextResponse.json(producto);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al actualizar." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    await prisma.producto.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar." }, { status: 500 });
  }
}
