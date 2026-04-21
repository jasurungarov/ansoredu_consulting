"use client";
 
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
 
export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
 
  // We'll keep the testimonials logic simple as they are usually hardcoded or from JSON
  const testimonials = [
    {
      name: "Jasur Ungarov",
      role: "KAU Student",
      content: "Ansor Edu yordamida Saudiya Arabistoniga o'qishga kirdim. Hozirda barcha xarajatlarim qoplangan holda tahsil olyapman.",
      avatar: "JU"
    },
    {
      name: "Malika Sobirova",
      role: "PNU Student",
      content: "Hujjatlarimni tayyorlashda juda katta yordam berishdi. Viza olish jarayoni ham kutilganidan oson kechdi.",
      avatar: "MS"
    }
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
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-blue-50 opacity-10" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
