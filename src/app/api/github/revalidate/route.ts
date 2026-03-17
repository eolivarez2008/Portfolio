import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Endpoint de purge manuelle du cache GitHub
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/projects");
  revalidatePath("/api/github");

  return NextResponse.json({ revalidated: true, ts: Date.now() });
}
