import { NextRequest, NextResponse } from "next/server";
import { getSection, setSection } from "@/lib/sections";
import { notifyAdminChange } from "@/lib/adminNotify";
import type { StatusConfig } from "@/types";

const SECTION = "statusConfig";

export async function GET() {
  const data = await getSection<StatusConfig>(SECTION);
  if (!data)
    return NextResponse.json({ error: "Section introuvable" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: StatusConfig = await req.json();
  const details = `${Object.keys(body.idMap ?? {}).length} services mappés`;
  await setSection(SECTION, body, details);
  await notifyAdminChange("Status Config", details);
  return NextResponse.json({ success: true });
}
