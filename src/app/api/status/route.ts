import { NextResponse } from "next/server";

// Rendu dynamique pour statuts frais
export const dynamic = "force-dynamic";

interface KumaHeartbeat {
  status: number;
  time: string;
  msg: string;
  ping?: number;
}

// Mapping des IDs services
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
    const kumaUrl = process.env.UPTIME_KUMA_URL;

    if (!kumaUrl) {
      return NextResponse.json(
        { services: [], error: "Configuration manquante (URL)" },
        { status: 500 },
      );
    }

    // Récupération data via Uptime Kuma
    const response = await fetch(kumaUrl, {
      next: { revalidate: 30 },
    });

    if (!response.ok) throw new Error("Uptime Kuma est injoignable");

    const data = await response.json();
    const heartbeatList: Record<string, KumaHeartbeat[]> =
      data.heartbeatList || {};

    // Transformation en liste d'objets exploitables
    const services = Object.keys(heartbeatList).map((id) => {
      const history = heartbeatList[id] || [];
      const lastCheck = history[history.length - 1] || { status: 0 };

      return {
        name: ID_MAP[id] || `Service ${id}`,
        status: lastCheck.status,
        history: history.slice(-20).map((h) => h.status),
      };
    });

    // Envoi avec cache navigateur 30s
    return NextResponse.json(
      { services },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10",
        },
      },
    );
  } catch (error) {
    console.error("Status API Uptime Error:", error);
    return NextResponse.json(
      { services: [], error: "Erreur lors de la récupération des statuts" },
      { status: 500 },
    );
  }
}
