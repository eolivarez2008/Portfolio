import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, chmod, unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";
import { notifyAdminChange } from "@/lib/adminNotify";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uploads = await prisma.upload.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(uploads);
}

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderRaw = formData.get("folder") as string | null;

    const raw = folderRaw?.trim() || "root";
    const folder = raw.toLowerCase() === "root" ? "root" : "Bulletins";

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 },
      );
    }

    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Seuls les PDFs sont acceptés" },
        { status: 400 },
      );
    }

    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const uploadDir =
      folder === "root"
        ? path.join(process.cwd(), "uploads")
        : path.join(process.cwd(), "uploads", folder);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, safeName);

    await writeFile(filePath, buffer);
    await chmod(filePath, 0o644);

    const publicPath =
      folder === "root"
        ? `/api/file/${safeName}`
        : `/api/file/${folder}/${safeName}`;

    const displayName = file.name
      .replace(/\.pdf$/i, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const upload = await prisma.upload.upsert({
      where: { path: publicPath },
      update: { displayName, sizeBytes: buffer.length },
      create: {
        filename: safeName,
        displayName,
        path: publicPath,
        category: folder,
        sizeBytes: buffer.length,
      },
    });

    await notifyAdminChange("Upload", `Nouveau fichier : ${publicPath}`);

    return NextResponse.json({ success: true, path: upload.path });
  } catch (err) {
    console.error("[Upload]", err);
    return NextResponse.json({ error: "Erreur upload" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path: publicPath } = await req.json();

    if (!publicPath) {
      return NextResponse.json({ error: "Path manquant" }, { status: 400 });
    }

    const parts = publicPath.replace("/api/file/", "").split("/");

    let fileSystemPath;

    if (parts.length === 1) {
      fileSystemPath = path.join(process.cwd(), "uploads", parts[0]);
    } else {
      fileSystemPath = path.join(process.cwd(), "uploads", parts[0], parts[1]);
    }

    await unlink(fileSystemPath).catch(() => {});

    await prisma.upload.delete({
      where: { path: publicPath },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE UPLOAD]", err);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
