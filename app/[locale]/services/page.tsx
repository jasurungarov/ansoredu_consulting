import ServicesSection from "@/components/home/ServicesSection";
import GrantBenefits from "@/components/home/GrantBenefits";
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("badge"),
  };
}

export default function ServicesPage() {
  return (
    <>
      <ServicesSection />
      <GrantBenefits />
    </>
  );
}
