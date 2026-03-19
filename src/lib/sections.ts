import { prisma } from "@/lib/db";

export async function getSection<T>(section: string): Promise<T | null> {
  const row = await prisma.siteSection.findUnique({ where: { section } });
  if (!row) return null;
  return JSON.parse(row.content) as T;
}

export async function setSection(
  section: string,
  data: unknown,
  details: string,
): Promise<void> {
  const content = JSON.stringify(data);
  await prisma.siteSection.upsert({
    where: { section },
    update: { content },
    create: { section, content },
  });
  await prisma.auditLog.create({
    data: { section, details },
  });
}
