import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const searchPaths = [path.join(process.cwd(), "uploads/data")];

  const sections = [
    "aboutData",
    "journeyData",
    "legalContent",
    "siteContent",
    "statusConfig",
  ];

  for (const section of sections) {
    let content: string | null = null;

    for (const dir of searchPaths) {
      const filePath = path.join(dir, `${section}.json`);
      try {
        content = readFileSync(filePath, "utf-8");
        console.log(`Trouvé : ${filePath}`);
        break;
      } catch {}
    }

    if (!content) {
      console.warn(`Fichier introuvable partout : ${section}.json`);
      continue;
    }

    await prisma.siteSection.upsert({
      where: { section },
      update: { content },
      create: { section, content },
    });
    console.log(`Section importée : ${section}`);
  }

  console.log("\nSeed terminé");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
