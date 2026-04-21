import CtaSection from "@/components/home/CtaSection";
import GrantBenefits from "@/components/home/GrantBenefits";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import UniversitiesSection from "@/components/home/UniversitiesSection";
import { universitiesData } from "@/lib/universities-data";



export default async function Home() {
  // Show first 3 universities on home page
  const universities = universitiesData.slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <UniversitiesSection universities={universities} />
      <GrantBenefits />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
