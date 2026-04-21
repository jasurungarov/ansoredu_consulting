import SectionHeader from "@/components/shared/SectionHeader";
import UniversityCard from "@/components/shared/UniversityCard";
import { universitiesData } from "@/lib/universities-data";
import { getTranslations } from "next-intl/server";
 
export async function generateMetadata({params}: {params: {locale: string}}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'universities'});
  return {
    title: t('badge'),
  };
}

export default async function UniversitiesPage({params}: {params: {locale: string}}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'universities'});
  const universities = universitiesData;

  return (
    <div className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          badge={t('badge')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </div>
      </div>
    </div>
  );
}
