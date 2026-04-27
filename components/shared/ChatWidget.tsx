"use client";

import { useLocale } from "next-intl"; // yoki sizning i18n kutubxonangiz
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UI_TEXT: Record<string, any> = {
  uz: {
    title: "Ansor Edu — AI Maslahat",
    placeholder: "Savol yozing...",
    send: "Yuborish",
    welcome:
      "Assalomu alaykum! 👋 Men Ansor Edu AI yordamchisiman.\n\nSaudiya va Arab universitetlariga to'liq grant haqida savol berishingiz mumkin!",
    typing: "Yozmoqda...",
  },
  ru: {
    title: "Ansor Edu — AI Консультант",
    placeholder: "Задайте вопрос...",
    send: "Отправить",
    welcome:
      "Здравствуйте! 👋 Я AI-помощник Ansor Edu. Вы можете задать любой вопрос о получении полных грантов в университеты Саудовской Аравии и других арабских стран!",
    typing: "Печатает...",
  },
  en: {
    title: "Ansor Edu — AI Assistant",
    placeholder: "Ask a question...",
    send: "Send",
    welcome:
      "Hello! 👋 I am the Ansor Edu AI assistant. You can ask me any questions about full scholarships to Saudi and Arab universities!",
    typing: "Typing...",
  },
  kg: {
    title: "Ansor Edu — AI Кеңешчи",
    placeholder: "Суроо жазыңыз...",
    send: "Жөнөтүү",
    welcome:
      "Ассалому алейкум! 👋 Мен Ansor Edu AI жардамчысымын. Сауд Арабиясынын жана араб университеттерине толук грант алуу боюнча суроолоруңузду берсеңиз болот!",
    typing: "Жазууда...",
  },
};

export default function ChatWidget() {
  const locale = useLocale();
  const t = UI_TEXT[locale] || UI_TEXT["en"];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          locale,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xatolik yuz berdi. Qayta urinib ko'ring.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-6 z-50 flex flex-col items-end">
      {/* Chat oynasi */}
      {isOpen && (
        <div className="mb-4 w-85 h-130 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-semibold text-sm">{t.title}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-lg">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-sm rounded-bl-none border border-green-400"
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border text-gray-400 text-sm">
                  <span className="animate-pulse">●●●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.placeholder}
              className="flex-1 text-sm border  rounded-xl px-3 py-2 outline-none focus:border-blue-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-xl disabled:opacity-50">
              {t.send}
            </button>
          </div>
        </div>
      )}

      {/* 2. Trigger Tugmasi (Faqat chat yopiq bo'lganda ko'rinadi) */}
      {!isOpen && (
          <Image
          onClick={() => setIsOpen(true)}
            src="/ai-2.png"
            alt="AI Assistant"
            width={84}
            height={84}
            className="overflow-hidden hover:scale-110 transition-transform animate-pulse "
            priority
          />
      )}
    </div>
  );
}
