"use client";
 
import {Link} from '@/i18n/routing';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { University } from "@/lib/universities-data";
import UniversityCard from "@/components/shared/UniversityCard";
 
interface UniversitiesSectionProps {
  universities: University[];
}
 
export default function UniversitiesSection({
  universities,
}: UniversitiesSectionProps) {
  const t = useTranslations('universities');
 
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14">
          <div>
            <span className="section-badge mb-3">{t('badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {t('title')}
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">{t('subtitle')}</p>
          </div>
          <Link href="/universities" className="btn-secondary text-sm shrink-0">
            {t('viewAll')}
          </Link>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {universities.map((uni, i) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <UniversityCard university={uni} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
