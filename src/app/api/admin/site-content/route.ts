import { NextRequest, NextResponse } from "next/server";
import { getSection, setSection } from "@/lib/sections";
import { notifyAdminChange } from "@/lib/adminNotify";
import type { SiteContent } from "@/types";

const SECTION = "siteContent";

export async function GET() {
  const data = await getSection<SiteContent>(SECTION);
  if (!data)
    return NextResponse.json({ error: "Section introuvable" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: SiteContent = await req.json();
  await setSection(SECTION, body, "Hero, quotes, expertise ou bio modifiés");
  await notifyAdminChange(
    "Site Content",
    "Hero, quotes, expertise ou bio modifiés",
  );
  return NextResponse.json({ success: true });
}
