import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

// ─── Per-locale metadata config 
type LocaleMeta = {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
  canonical: string;
};

const metaConfig: Record<string, LocaleMeta> = {
  uz: {
    title: "Ansor Edu — Saudiya va Arab universitetlarida To'liq Grant",
    description:
      "Ansor Edu — Talabalarni Saudiya Arabistoni va Arab mamlakatlarining grant beruvchi universitetlariga (KAU, IUM, KAUST, Al-Azhar, Umm al-Qura va boshqalar) to'liq stipendiya orqali qabul qilishda yordam beruvchi yetakchi ta'lim konsalting markazi.",
    keywords: [
      // Brand
      "Ansor Edu", "AnsorEdu", "ansoredu.uz", "Ansor Edu Toshkent",
      // Core offering
      "Saudiya universiteti grant", "to'liq grant Saudiya", "Saudiya stipendiyasi",
      "xorijda bepul o'qish", "Arab universitetlari grant", "to'liq stipendiya",
      // Universities
      "Madina Islom Universiteti", "IUM grant", "Malik Abdulaziz Universiteti",
      "KAU stipendiya", "KAUST grant", "Al-Azhar universiteti",
      "Umm al-Qura universiteti", "Imom Muhammad Ibn Saud universiteti",
      "Qirol Faxd universiteti", "KFUPM", "Taibah universiteti",
      "Qatar universiteti", "Khalifa universiteti",
      // Subjects
      "shariat o'qish Saudiya", "arab tili kursi Saudiya", "islom ilmi",
      "Qur'on hafizi o'qishi", "tibbiyot Saudiya", "muhandislik granti",
      "IT Saudiya universiteti",
      // Process
      "Saudiyaga hujjat topshirish", "Saudiya viza yordam",
      "ta'lim konsalting O'zbekiston", "xorijda o'qish konsultatsiya",
      "grant uchun ariza", "Saudiya elchixonasi tasdiq",
      // Geo
      "O'zbekiston Saudiya ta'lim", "Konsalting markazi",
    ].join(", "),
    ogLocale: "uz_UZ",
    canonical: "https://ansoredu.uz/uz",
  },
  ru: {
    title: "Ansor Edu — Полный грант в университетах Саудовской Аравии",
    description:
      "Ansor Edu — ведущий образовательный консалтинговый центр, помогающий студентам поступить в университеты Саудовской Аравии и арабских стран (KAU, IUM, KAUST, Аль-Азхар и другие) на полностью финансируемой основе.",
    keywords: [
      "Ansor Edu", "грант Саудовская Аравия", "стипендия Саудовская Аравия",
      "полный грант университет", "бесплатное обучение за рубежом",
      "Исламский университет Медины", "IUM стипендия",
      "Университет Короля Абдулазиза", "KAU грант", "KAUST стипендия",
      "Аль-Азхар Каир", "Умм аль-Кура", "KFUPM", "Таибах университет",
      "шариат обучение Саудовская Аравия", "арабский язык курс",
      "исламское образование за рубежом", "медицина Саудовская Аравия",
      "инженерия грант Саудовская Аравия", "документы для поступления",
      "помощь с визой Саудовская Аравия", "консалтинг образование Узбекистан",
      "поступление в арабские университеты", "Ansor Edu Ташкент",
    ].join(", "),
    ogLocale: "ru_RU",
    canonical: "https://ansoredu.uz/ru",
  },
  kg: {
    title: "Ansor Edu — Сауд Аравиясында Толук Грант",
    description:
      "Ansor Edu — студенттерге Сауд Аравиясы жана Араб өлкөлөрүнүн университеттерине (KAU, IUM, KAUST, Аль-Азхар жана башкалар) толук грант менен кирүүгө жардам берүүчү жетектөөчү билим берүү консалтинг борбору.",
    keywords: [
      "Ansor Edu", "Сауд Аравиясы гранты", "толук грант университет",
      "Мадина Ислам университети", "IUM гранты", "Король Абдулазиз университети",
      "KAU стипендиясы", "KAUST", "Аль-Азхар", "акысыз окуу чет өлкөдө",
      "шариат окуу Сауд Аравиясы", "Кыргызстан консалтинг билим",
      "Анsor Edu Бишкек", "Araб университеттери гранты",
    ].join(", "),
    ogLocale: "ky_KG",
    canonical: "https://ansoredu.uz/kg",
  },
  en: {
    title: "Ansor Edu — Full Scholarships at Saudi & Arab Universities",
    description:
      "Ansor Edu — a leading educational consulting center helping students secure fully-funded scholarships to top Saudi Arabian and Arab universities including KAU, IUM, KAUST, Al-Azhar, Umm al-Qura, and more.",
    keywords: [
      "Ansor Edu", "Saudi Arabia scholarship", "fully funded scholarship",
      "Arab university grant", "Islamic University of Madinah scholarship",
      "King Abdulaziz University grant", "KAUST scholarship", "Al-Azhar scholarship",
      "Umm al-Qura University", "King Fahd University KFUPM", "Taibah University",
      "study in Saudi Arabia free", "Saudi student visa help",
      "Islamic studies scholarship", "Quran scholarship Saudi",
      "Sharia law degree Saudi Arabia", "engineering scholarship Saudi",
      "medicine scholarship Saudi Arabia", "IT scholarship Arab countries",
      "education consulting Uzbekistan", "Ansor Edu Tashkent",
      "apply Saudi university", "Arab world scholarship 2025",
    ].join(", "),
    ogLocale: "en_US",
    canonical: "https://ansoredu.uz/en",
  },
};

// ─── generateMetadata 
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cfg = metaConfig[locale] ?? metaConfig.uz;

  return {
    // ── Core 
    title: {
      default: cfg.title,
      template: "%s | Ansor Edu",
    },
    description: cfg.description,
    keywords: cfg.keywords,

    // ── Authorship 
    authors: [{ name: "Jasur Ungarov", url: "https://ungarov.uz" }],
    creator: "Jasur Ungarov",
    publisher: "Jasur Ungarov",

    // ── Icons 
    icons: {
      icon: [
        { url: "/ansor-edu-logo.png", sizes: "any" },
        { url: "/ansor_edu_logotip.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },

    // ── Open Graph 
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      type: "website",
      url: cfg.canonical,
      locale: cfg.ogLocale,
      alternateLocale: ["uz_UZ", "ru_RU", "ky_KG", "en_US"].filter(
        (l) => l !== cfg.ogLocale
      ),
      siteName: "Ansor Edu",
      emails: ["ansoredu@gmail.com"],
      countryName: "Uzbekistan",
      images: [
        {
          url: "https://ansoredu.uz/og-image.png",
          width: 1200,
          height: 630,
          alt: cfg.title,
          type: "image/png",
        },
      ],
    },

    // ── Twitter / X 
    twitter: {
      card: "summary_large_image",
      title: cfg.title,
      description: cfg.description,
      images: ["https://ansoredu.uz/og-image.png"],
      site: "@ansoredu",
      creator: "@ansoredu",
    },

    // ── Canonical & hreflang 
    alternates: {
      canonical: cfg.canonical,
      languages: {
        "uz-UZ": "https://ansoredu.uz/uz",
        "ru-RU": "https://ansoredu.uz/ru",
        "ky-KG": "https://ansoredu.uz/kg",
        "en-US": "https://ansoredu.uz/en",
        "x-default": "https://ansoredu.uz/uz",
      },
    },

    // ── Robots 
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── App meta 
    applicationName: "Ansor Edu",
    category: "education",
    manifest: "/manifest.json",

    // ── Extras 
    other: {
      "geo.region": "UZ",
      "geo.placename": "Tashkent, Uzbekistan",
      "geo.position": "41.2995;69.2401",
      "ICBM": "41.2995, 69.2401",
      "og:email": "ansoredu@gmail.com",
      "og:phone_number": "+998900000000",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-16 flex flex-col">
            {props.children}
          </main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}