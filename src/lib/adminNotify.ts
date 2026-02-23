export async function notifyAdminChange(
  section: string,
  details: string,
): Promise<void> {
  const webhookUrl = process.env.DISCORD_ADMIN_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "<@&1483836726429356123>",
      embeds: [
        {
          title: `🛠️ Modification Admin — ${section}`,
          color: 0xff4444,
          fields: [
            { name: "Section modifiée", value: `\`${section}\``, inline: true },
            { name: "Détails", value: `\`\`\`\n${details}\n\`\`\`` },
          ],
          footer: { text: "Admin Panel" },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  }).catch((e) => console.error("[AdminNotify] Discord webhook error:", e));
}
