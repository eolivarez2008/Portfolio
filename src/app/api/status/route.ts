import { NextResponse } from "next/server";

interface KumaHeartbeat {
  status: number;
  time: string;
  msg: string;
  ping?: number;
}

const ID_MAP: Record<string, string> = {
  "1": "Dockge",
  "2": "Bac Pro CIEL",
  "3": "n8n",
  "4": "Naruto",
  "5": "Portainer",
  "6": "Portfolio",
  "7": "Stirling",
  "8": "Uptime Kuma",
  "9": "Vaultwarden",
};

export async function GET() {
  try {
    const response = await fetch(
      "https://uptime.eolivarez.site/api/status-page/heartbeat/default",
      {
        next: { revalidate: 30 },
      },
    );

    if (!response.ok) throw new Error("Kuma unreachable");

    const data = await response.json();
    const heartbeatList: Record<string, KumaHeartbeat[]> =
      data.heartbeatList || {};

    const services = Object.keys(heartbeatList).map((id: string) => {
      const history: KumaHeartbeat[] = heartbeatList[id] || [];
      const lastCheck = history[history.length - 1] || { status: 0 };

      return {
        name: ID_MAP[id] || `Service ${id}`,
        status: lastCheck.status,
        history: history.slice(-20).map((h: KumaHeartbeat) => h.status),
      };
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Status API Uptime Error:", error);
    return NextResponse.json(
      { services: [], error: "Failed to fetch status" },
      { status: 500 },
    );
  }
}
