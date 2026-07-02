import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const { nombre } = await request.json();
    const categoria = await prisma.categoria.update({
      where: { id: params.id },
      data: { nombre: nombre.trim() },
    });
    return NextResponse.json(categoria);
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Nombre ya existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al actualizar." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    await prisma.categoria.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se puede eliminar: tiene productos asociados." },
      { status: 409 }
    );
  }
}
