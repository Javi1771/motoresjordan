import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request, { params }) {
  if (!await getSession()) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const body = await request.json();
  const data = {};
  if ("publicada" in body) data.publicada = Boolean(body.publicada);
  if ("revisada" in body) data.revisada = Boolean(body.revisada);
  // Publishing implies reviewed
  if (data.publicada === true) data.revisada = true;
  const { id } = await params;
  const resena = await prisma.resena.update({ where: { id }, data });
  return NextResponse.json(resena);
}

export async function DELETE(_, { params }) {
  if (!await getSession()) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  await prisma.resena.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
