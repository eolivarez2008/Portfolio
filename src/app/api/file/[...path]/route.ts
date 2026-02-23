import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: filePath } = await params;
    const normalized = filePath.join("/").replace(/\.\./g, "");

    const searchRoots = [
      path.join(process.cwd()),
      path.join(process.cwd(), "public"),
    ];

    let buffer: Buffer | null = null;
    let resolvedPath = "";

    for (const root of searchRoots) {
      const candidate = path.join(root, normalized);
      if (!candidate.startsWith(root)) continue;
      try {
        buffer = await readFile(candidate);
        resolvedPath = candidate;
        break;
      } catch {}
    }

    if (!buffer) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
    };

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentTypes[ext] ?? "application/octet-stream",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
