import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, captchaToken } = await req.json();

    // Validation du token via l'API Cloudflare
    const verifyFormData = new FormData();
    verifyFormData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
    verifyFormData.append("response", captchaToken);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: verifyFormData,
      },
    );

    const outcome = await res.json();
    if (!outcome.success) {
      return NextResponse.json(
        { error: "Échec de validation CAPTCHA" },
        { status: 400 },
      );
    }

    // Préparation du rapport de log pour Discord
    const discordPayload = {
      username: "EOLIVAREZ-INFRA",
      avatar_url: "https://eolivarez.site/favicon.ico",
      embeds: [
        {
          title: "ENTRY // CONTACT_FORM_SUBMISSION",
          color: 0x2b2d31,
          description: `### 📝 Rapport de transmission\nSource: **[eolivarez.site]**`,
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

    // Envoi des données vers le Webhook Discord
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) throw new Error("Discord API error");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
