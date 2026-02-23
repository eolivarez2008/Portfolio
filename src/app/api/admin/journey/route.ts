import { NextRequest, NextResponse } from "next/server";
import { getSection, setSection } from "@/lib/sections";
import { notifyAdminChange } from "@/lib/adminNotify";
import type { JourneyData } from "@/types";

const SECTION = "journeyData";

export async function GET() {
  const data = await getSection<JourneyData>(SECTION);
  if (!data)
    return NextResponse.json({ error: "Section introuvable" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: JourneyData = await req.json();
  const details = `${body.journey?.length ?? 0} entrées, ${body.archives?.reduce((a, f) => a + f.items.length, 0)} documents`;
  await setSection(SECTION, body, details);
  await notifyAdminChange("Journey", details);
  return NextResponse.json({ success: true });
}
