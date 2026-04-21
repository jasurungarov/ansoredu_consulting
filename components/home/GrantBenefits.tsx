"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function GrantBenefits() {
  const t = useTranslations("grants");

  const benefits = [
    t("flight"),
    t("accommodation"),
    t("healthcare"),
    t("allowance"),
    t("meals"),
    t("materials"),
    t("transport"),
    t("bonus"),
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <span className="section-badge mb-4">{t("badge")}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-gray-500 mb-8 text-lg">{t("subtitle")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-20 flex justify-center items-center w-full">
            <div className="relative w-full max-w-2xl aspect-500/420">
              <Image
                src={"/uae-flags.png"}
                alt="flag"
                fill
                className="rounded-2xl object-cover mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
