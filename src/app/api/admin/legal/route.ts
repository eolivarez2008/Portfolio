import { NextRequest, NextResponse } from "next/server";
import { getSection, setSection } from "@/lib/sections";
import { notifyAdminChange } from "@/lib/adminNotify";
import type { LegalContent } from "@/types";

const SECTION = "legalContent";

export async function GET() {
  const data = await getSection<LegalContent>(SECTION);
  if (!data)
    return NextResponse.json({ error: "Section introuvable" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: LegalContent = await req.json();
  await setSection(SECTION, body, "Contenu légal modifié");
  await notifyAdminChange("Legal", "Mentions légales / RGPD modifiés");
  return NextResponse.json({ success: true });
}
