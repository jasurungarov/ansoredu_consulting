"use client";
 
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
 
export default function StatsSection() {
  const t = useTranslations('stats');
 
  const stats = [
    { value: t('universities'), label: t('universitiesLabel') },
    { value: t('years'), label: t('yearsLabel') },
    { value: t('success'), label: t('successLabel') },
  ];
 
  return (
    <section className="py-12 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-4xl font-extrabold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-blue-100 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
