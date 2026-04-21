import SectionHeader from "@/components/shared/SectionHeader";
import { CheckCircle2, ShieldCheck, Target, HeartHandshake } from "lucide-react";
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'


export async function generateMetadata({params}: {params: {locale: string}}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'about'});
  return {
    title: t('badge'),
  };
}

export default function AboutPage() {
  const t = useTranslations("about");
  
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              title={t("title")}
              badge={t("badge")}
              center={false}
            />
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t("description2")}
            </p>

            <div className="space-y-4 mb-8">
              {[
                t('point7'),
                t('point2'),
                t('point5'),
                t('point6')
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-blue-600 shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 relative pt-12">
              <div className="bg-blue-50 rounded-3xl p-6 shadow-sm border border-blue-100">
                <ShieldCheck size={40} className="text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t('card.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('card.text')}
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-4">
                <Target size={40} className="text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t('card.title1')}</h3>
                <p className="text-sm text-gray-600">
                  {t('card.text1')}
                </p>
              </div>
            </div>
            <div className="space-y-4 pb-12">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <HeartHandshake size={40} className="text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t('card.title2')}</h3>
                <p className="text-sm text-gray-600">
                 {t('card.text2')}
                </p>
              </div>
              {/* Optional image could go here */}
              <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl p-6 shadow-sm text-white flex flex-col justify-center min-h-55">
                <div className="text-4xl font-black mb-2">{t('card.title3')}</div>
                <div className="text-blue-200">{t('card.text3')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
