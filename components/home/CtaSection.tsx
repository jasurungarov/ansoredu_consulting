"use client";
 
import {Link} from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
 
export default function CtaSection() {
  const t = useTranslations('cta');
 
  return (
    <section className="py-20 lg:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20"
        >
          {/* Decorative background circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
 
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 opacity-90">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {t('button')}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
