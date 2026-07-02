import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  if (!await getSession()) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const data = await prisma.resena.findMany({ orderBy: { creadoEn: "desc" } });
  return NextResponse.json(data);
}
