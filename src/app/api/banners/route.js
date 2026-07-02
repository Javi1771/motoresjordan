import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { activo: true },
      orderBy: { orden: "asc" },
    });
    return NextResponse.json(banners);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
