import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const ALLOWED_ROOTS = [path.join(process.cwd(), "uploads")];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathSegments } = await params;

    const joined = pathSegments.join("/");
    const decoded = decodeURIComponent(joined);
    const safePath = decoded
      .split("/")
      .filter(
        (seg) => seg !== ".." && seg !== "." && seg !== "" && seg !== "uploads",
      )
      .join("/");

    let buffer: Buffer | null = null;
    let resolvedPath = "";

    for (const root of ALLOWED_ROOTS) {
      const candidate = path.resolve(root, safePath);

      if (!candidate.startsWith(root + path.sep) && candidate !== root)
        continue;

      try {
        buffer = await readFile(candidate);
        resolvedPath = candidate;
        break;
      } catch {
        continue;
      }
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
      ".svg": "image/svg+xml",
    };

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentTypes[ext] ?? "application/octet-stream",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600",
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "default-src 'self'",
      },
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
