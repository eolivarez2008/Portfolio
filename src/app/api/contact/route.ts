import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message, captchaToken } = body;

    const cleanName = name?.trim() || "";
    const cleanEmail = email?.trim() || "";
    const cleanMessage = message?.trim() || "";

    if (!cleanName || cleanName.length > 100) {
      return NextResponse.json(
        { error: "Nom invalide (max 100 caractères)." },
        { status: 400 },
      );
    }

    if (!cleanMessage || cleanMessage.length > 2000) {
      return NextResponse.json(
        { error: "Message invalide (max 2000 caractères)." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !cleanEmail ||
      !emailRegex.test(cleanEmail) ||
      cleanEmail.length > 150
    ) {
      return NextResponse.json(
        { error: "Adresse e-mail non valide." },
        { status: 400 },
      );
    }

    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha manquant." }, { status: 400 });
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: captchaToken,
          remoteip: req.headers.get("x-forwarded-for") || "",
        }),
      },
    );

    const outcome = await res.json();
    if (!outcome.success) {
      return NextResponse.json(
        { error: "Échec de la validation humaine." },
        { status: 403 },
      );
    }

    const safeMessage = cleanMessage.replace(/`/g, "'");

    const discordPayload = {
      username: "Portfolio Contact",
      content: "<@&1483836726429356123> Nouveau message de contact reçu !",
      embeds: [
        {
          title: "Nouveau formulaire de contact reçu",
          color: 0x2b2d31,
          fields: [
            { name: "Expéditeur", value: `\`${cleanName}\``, inline: true },
            { name: "Email", value: `\`${cleanEmail}\``, inline: true },
            { name: "Message", value: `\`\`\`text\n${safeMessage}\n\`\`\`` },
          ],
          footer: { text: "EOLIVAREZ Infrastructure" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordRes = await fetch(process.env.DISCORD_CONTACT_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!discordRes.ok) throw new Error("Erreur lors de l'envoi Discord");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Le serveur a rencontré un problème." },
      { status: 500 },
    );
  }
}
