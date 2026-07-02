import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const config = await prisma.configuracion.findUnique({ where: { id: "singleton" } });
  return NextResponse.json(config ?? {});
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    const config = await prisma.configuracion.upsert({
      where: { id: "singleton" },
      update: {
        telefono1: data.telefono1?.trim() || null,
        telefono2: data.telefono2?.trim() || null,
        correo: data.correo?.trim() || null,
        whatsapp: data.whatsapp?.trim() || null,
        direccion1: data.direccion1?.trim() || null,
        direccion2: data.direccion2?.trim() || null,
        horario: data.horario?.trim() || null,
        facebook: data.facebook?.trim() || null,
        instagram: data.instagram?.trim() || null,
        textoHero: data.textoHero?.trim() || null,
        subtextoHero: data.subtextoHero?.trim() || null,
      },
      create: {
        id: "singleton",
        telefono1: data.telefono1?.trim() || null,
        telefono2: data.telefono2?.trim() || null,
        correo: data.correo?.trim() || null,
        whatsapp: data.whatsapp?.trim() || null,
        direccion1: data.direccion1?.trim() || null,
        direccion2: data.direccion2?.trim() || null,
        horario: data.horario?.trim() || null,
        facebook: data.facebook?.trim() || null,
        instagram: data.instagram?.trim() || null,
        textoHero: data.textoHero?.trim() || null,
        subtextoHero: data.subtextoHero?.trim() || null,
      },
    });
    return NextResponse.json(config);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al guardar configuración." }, { status: 500 });
  }
}
