import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const galeria = await prisma.galeria.findMany({
    orderBy: [{ orden: "asc" }, { creadoEn: "desc" }],
  });
  return NextResponse.json(galeria);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.imagen?.trim()) {
      return NextResponse.json({ error: "La imagen es requerida." }, { status: 400 });
    }
    const item = await prisma.galeria.create({
      data: {
        imagen: data.imagen.trim(),
        descripcion: data.descripcion?.trim() || null,
        orden: parseInt(data.orden ?? 0),
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear elemento." }, { status: 500 });
  }
}
