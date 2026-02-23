import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

interface KumaHeartbeat {
  status: number;
  time: string;
  msg: string;
  ping?: number;
}

interface UptimeKumaResponse {
  heartbeatList: Record<string, KumaHeartbeat[]>;
}

async function getIdMap(): Promise<Record<string, string>> {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "public/data/statusConfig.json"),
      "utf-8",
    );
    return JSON.parse(raw).idMap ?? {};
  } catch {
    return {};
  }
}

export async function GET() {
  try {
    const kumaUrl = process.env.UPTIME_KUMA_URL;

    if (!kumaUrl) {
      return NextResponse.json(
        { services: [], error: "Configuration serveur incomplète" },
        { status: 500 },
      );
    }

    const [response, ID_MAP] = await Promise.all([
      fetch(kumaUrl, {
        next: { revalidate: 30 },
        headers: { "User-Agent": "eolivarez-portfolio-monitor" },
      }),
      getIdMap(),
    ]);

    if (!response.ok) {
      throw new Error("Uptime Kuma est injoignable");
    }

    const data = (await response.json()) as UptimeKumaResponse;
    const heartbeatList = data.heartbeatList || {};

    const services = Object.keys(heartbeatList).map((id) => {
      const history = heartbeatList[id] || [];
      const lastCheck =
        history.length > 0 ? history[history.length - 1] : { status: 0 };

      return {
        name: ID_MAP[id] || `Service ${id}`,
        status: lastCheck.status,
        history: history.slice(-20).map((h) => h.status),
      };
    });

    return NextResponse.json(
      { services },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10",
        },
      },
    );
  } catch (error) {
    console.error("Critical Status API Error:", error);
    return NextResponse.json(
      { services: [], error: "Erreur lors de la récupération des statuts" },
      { status: 500 },
    );
  }
}
