import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: "Ansor Edu — Saudiya va Arab universitetlarida to'liq grant",
      template: "%s | Ansor Edu",
    },
    description:
      "Ansor Edu — Talabalarni Saudiya va Arab universitetlarida to'liq stipendiya orqali qabul qilishda yordam beruvchi yetakchi konsalting markaz.",
    authors: [{ name: "Jasur Ungarov", url: "https://ungarov.uz" }],
    icons: { icon: "/ansor-edu-logo.png" },
    openGraph: {
      title: "Ansor Edu — Saudiya va Arab universitetlarida to'liq grant",
      description:
        "Experience instant and interactive conversations with InTeract, a modern real-time chat application built using Next.js and MongoDB by Jasur Ungarov.",
      type: "website",
      url: "https://ansoredu.uz",
      locale: "en_US",
      images: ["/ansor_edu_logotip.png"],
      countryName: "Asia",
      siteName: "Ansor Edu",
      emails: "ansoredu@gmail.com",
    },
    keywords:
      "InTeract, Interact app, InTeract chat, Jasur Ungarov, Next.js chat app, MongoDB chat app, real-time messaging, interactive chat platform, modern web communication, Ungarov web, Kyrgyzstan tech, next generation chat, instant messaging app",
  };
}

export default async function LocaleLayout(props: { 
  children: React.ReactNode; 
  params: Promise<{ locale: string }>; 
}) {
  const params = await props.params;
  const locale = params.locale;
  const children = props.children;
  
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-16 flex flex-col">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
