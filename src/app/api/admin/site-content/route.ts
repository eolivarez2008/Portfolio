import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { notifyAdminChange } from "@/lib/adminNotify";

const DATA_PATH = path.join(process.cwd(), "public/data/siteContent.json");

export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    await writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
    await notifyAdminChange(
      "Site Content",
      "Hero, quotes, expertise ou bio modifiés",
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur écriture" }, { status: 500 });
  }
}
