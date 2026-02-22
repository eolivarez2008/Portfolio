import { NextResponse } from "next/server";

// Rendu dynamique pour statuts frais
export const dynamic = "force-dynamic";

interface KumaHeartbeat {
  status: number;
  time: string;
  msg: string;
  ping?: number;
}

// Ajout de l'interface de réponse pour le typage strict
interface UptimeKumaResponse {
  heartbeatList: Record<string, KumaHeartbeat[]>;
}

// Mapping des IDs services (Uptime Kuma)
const ID_MAP: Record<string, string> = {
  "1": "Portfolio",
  "2": "Bac Pro CIEL",
  "3": "Naruto",
  "4": "Portainer",
  "6": "Uptime Kuma",
  "7": "Stirling",
  "8": "Vaultwarden",
  "9": "Dockge",
};

export async function GET() {
  try {
    const kumaUrl = process.env.UPTIME_KUMA_URL;

    if (!kumaUrl) {
      console.error(
        "[Status API] URL Uptime Kuma manquante dans les variables d'env",
      );
      return NextResponse.json(
        { services: [], error: "Configuration serveur incomplète" },
        { status: 500 },
      );
    }

    // Récupération data via Uptime Kuma avec timeout
    const response = await fetch(kumaUrl, {
      next: { revalidate: 30 },
      headers: { "User-Agent": "eolivarez-portfolio-monitor" },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(
        `[Status API] Kuma unreachable (${response.status}): ${errorText}`,
      );
      throw new Error("Uptime Kuma est injoignable");
    }

    const data = (await response.json()) as UptimeKumaResponse;
    const heartbeatList = data.heartbeatList || {};

    // Transformation en liste d'objets exploitables
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

    // Envoi avec cache navigateur et CDN (30s)
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
