"use client";
 
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { 
  FileCheck, 
  ShieldCheck, 
  Send, 
  BookOpen, 
  MessageSquare, 
  Stamp 
} from "lucide-react";
 
export default function ServicesSection() {
  const t = useTranslations('services');
 
  const services = [
    {
      title: t('s1Title'),
      desc: t('s1Desc'),
      icon: <FileCheck className="w-6 h-6" />,
    },
    {
      title: t('s2Title'),
      desc: t('s2Desc'),
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: t('s3Title'),
      desc: t('s3Desc'),
      icon: <Send className="w-6 h-6" />,
    },
    {
      title: t('s4Title'),
      desc: t('s4Desc'),
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: t('s5Title'),
      desc: t('s5Desc'),
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: t('s6Title'),
      desc: t('s6Desc'),
      icon: <Stamp className="w-6 h-6" />,
    },
  ];
 
  return (
    <section className="py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-badge mb-4">{t('badge')}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
