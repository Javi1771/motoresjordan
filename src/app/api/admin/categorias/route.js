import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { productos: true } } },
    orderBy: { nombre: "asc" },
  });
  return NextResponse.json(categorias);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const { nombre } = await request.json();
    if (!nombre?.trim()) {
      return NextResponse.json({ error: "El nombre es requerido." }, { status: 400 });
    }
    const categoria = await prisma.categoria.create({ data: { nombre: nombre.trim() } });
    return NextResponse.json(categoria, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Categoría ya existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al crear categoría." }, { status: 500 });
  }
}
