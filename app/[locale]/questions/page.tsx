import SectionHeader from "@/components/shared/SectionHeader";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { MessageCircleQuestion } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; icon: string; items: FaqItem[] };

export default async function QuestionsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const tContact = await getTranslations({ locale, namespace: "contact" });

  const categories = t.raw("categories") as FaqCategory[];
  const totalQuestions = categories.reduce(
    (sum, c) => sum + c.items.length,
    0
  );

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("title")} badge={t("badge")} center />
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto -mt-6 mb-4">
          {t("subtitle")}
        </p>
        <p className="text-center text-sm text-gray-400 mb-12">
          {totalQuestions}+ savol-javob
        </p>

        <FaqAccordion categories={categories} searchPlaceholder={t("searchPlaceholder")} notFoundText={t("notFound")} />

        {/* CTA pastda */}
        <div className="mt-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl p-10 sm:p-14 text-center text-white">
          <MessageCircleQuestion size={40} className="mx-auto mb-4 text-blue-200" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {t("stillHaveQuestions")}
          </h3>
          <p className="text-blue-100 mb-8">{tContact("subtitle")}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition"
          >
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
