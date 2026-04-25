import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
};

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2),
  interestedIn: z.string().min(1),
  nickName: z.string().optional().or(z.literal("")),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram env variables missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const text = `
🎓 *YANGI ARIZA — ANSOR EDU*

📄 *Foydalanuvchi ma'lumotlari*

👤 To'liq ism: ${data.fullName}
📞 Telefon raqami: ${data.phone}
📧 Elektron pochta: ${data.email || "Mavjud emas, kiritilmagan"}
🏙️ Yashash shahri: ${data.city}
🏛️ Qiziqayotgan universiteti: ${data.interestedIn}
🆔 Telegram niki: ${data.nickName ? "@" + escapeMarkdown(data.nickName.replace('@', '')) : "Mavjud emas, kiritilmagan"}

💬 *Murojaat mazmuni:*

${data.message || "Xabar qoldirilmagan & qiziqish bildirilgan"}

🕐 *Vaqt:* ${new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    })}
    `.trim();

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramRes.ok) {
      const err = await telegramRes.json();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "Telegram delivery failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}