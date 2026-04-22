"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-badge mb-4">{t("badge")}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-12 h-12 text-blue-50 opacity-10" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {t("student1.avatar")}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {t("student1.name")}
                </h4>
                <p className="text-sm text-blue-600 font-medium">
                  {t("student1.role")}
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              {t("student1.content")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-12 h-12 text-blue-50 opacity-10" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {t("student2.avatar")}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  {t("student2.name")}
                </h4>
                <p className="text-sm text-blue-600 font-medium">
                  {t("student2.role")}
                </p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              {t("student2.content")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
