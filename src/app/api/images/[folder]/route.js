import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED = new Set(["marcas", "motores", "bombas", "refacciones"]);

export async function GET(_req, { params }) {
  const { folder } = await params;
  if (!ALLOWED.has(folder)) {
    return NextResponse.json({ error: "Folder not allowed" }, { status: 403 });
  }
  const dir = path.join(process.cwd(), "public", folder);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpg|jpeg|webp|avif)$/i.test(f))
      .sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b));
    return NextResponse.json({ images: files });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
