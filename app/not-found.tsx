import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-8">
        <GraduationCap className="text-blue-600 w-10 h-10" />
      </div>
      <h1 className="text-6xl font-extrabold text-blue-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h2>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        {t("description")}
      </p>
      <Link href="/" className="btn-primary px-8 py-3">
        {t("homeButton")}
      </Link>
    </div>
  );
}
