import ApplicationForm from "@/components/shared/ApplicationForm";
import SectionHeader from "@/components/shared/SectionHeader";
import { Clock, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TbBrandTelegram } from "react-icons/tb";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("badge"),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          badge={t("badge")}
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("card.title")}
              </h3>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <TbBrandTelegram size={26} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t("telegram")}
                    </h4>
                    <a
                      href="tel:+998901234567"
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                      {t("telegramSubtitle")}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t("card.phone")}
                    </h4>
                    <a
                      href="tel:+998901234567"
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                      {t("card.phoneLine")}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t("card.email")}
                    </h4>
                    <a
                      href="mailto:info@ansoredu.uz"
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                      {t("card.emailLine")}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t("card.hours")}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {t("card.hoursLine")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Motivational Quote Card */}
            <div className="relative rounded-3xl h-64 overflow-hidden bg-linear-to-br from-[#1B3A8C] to-[#0f2460] flex flex-col items-center justify-center p-8 text-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full translate-y-12 -translate-x-12" />
              <div className="absolute top-4 left-6 text-[#D4AF37]/20 text-8xl font-serif leading-none select-none">
                {t("motivational.dot")}
              </div>
              <div className="absolute bottom-2 right-6 text-[#D4AF37]/20 text-8xl font-serif leading-none select-none">
                {t("motivational.dot")}
              </div>

              <div className="relative z-10 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto">
                  <svg
                    className="w-5 h-5 text-[#D4AF37]"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
              <p className="relative z-10 text-white text-base font-medium leading-relaxed max-w-xs">
                {t("motivational.subtitle")}
                <span className="text-[#D4AF37] font-semibold">
                  {t("motivational.subtitle1")}
                </span>
                {t("motivational.subtitle2")}
              </p>
              <div className="relative z-10 mt-4 flex items-center gap-2">
                <div className="w-8 h-px bg-[#D4AF37]/50" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                  {t("motivational.title")}
                </span>
                <div className="w-8 h-px bg-[#D4AF37]/50" />
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 p-8 sm:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("card.cardTitle")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("card.cardSubtitle")}
                </p>
              </div>
              <ApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
