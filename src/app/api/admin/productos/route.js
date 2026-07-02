import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const productos = await prisma.producto.findMany({
    include: { categoria: true },
    orderBy: [{ orden: "asc" }, { creadoEn: "desc" }],
  });
  return NextResponse.json(productos);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.nombre?.trim()) {
      return NextResponse.json({ error: "El nombre es requerido." }, { status: 400 });
    }

    const producto = await prisma.producto.create({
      data: {
        nombre: data.nombre.trim(),
        descripcion: data.descripcion?.trim() || null,
        precio: data.precio ? parseFloat(data.precio) : null,
        categoriaId: data.categoriaId || null,
        imagen: data.imagen?.trim() || null,
        activo: data.activo !== false,
        destacado: data.destacado === true,
        orden: parseInt(data.orden ?? 0),
      },
      include: { categoria: true },
    });
    return NextResponse.json(producto, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al crear producto." }, { status: 500 });
  }
}
