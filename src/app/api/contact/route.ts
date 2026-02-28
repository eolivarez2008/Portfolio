import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, captchaToken } = await req.json();

    // Validation du token via l'API Cloudflare (format x-www-form-urlencoded)
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: captchaToken,
        }),
      },
    );

    const outcome = await res.json();

    if (!outcome.success) {
      console.error("Turnstile Error:", outcome["error-codes"]);
      return NextResponse.json(
        { error: "Vérification de sécurité invalide. Veuillez réessayer." },
        { status: 400 },
      );
    }

    const discordPayload = {
      username: "Contact Form",
      content: "@everyone !!! Nouveau message reçu depuis le portfolio !",
      avatar_url: "https://eolivarez.site/favicon.ico",
      embeds: [
        {
          title: "Nouveau Fomrulaire de Contact",
          color: 0x2b2d31,
          description: `### 📝 Rapport de transmission\nSource: **eolivarez.site**`,
          fields: [
            {
              name: "📋 EXPÉDITEUR",
              value: `> **Nom** : \`${name}\` \n> **E-mail** : \`${email}\``,
            },
            {
              name: "💬 MESSAGE",
              value: `\`\`\`text\n${message || "N/A"}\n\`\`\``,
            },
          ],
          footer: { text: "EOLIVAREZ - CONTACT WEBHOOK" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}
