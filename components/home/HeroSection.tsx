"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <span className="section-badge mb-6 inline-flex">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contact"
                className="btn-primary text-base px-8 py-4 gap-2">
                {t("ctaApply")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/universities"
                className="btn-secondary text-base px-8 py-4">
                {t("ctaLearnMore")}
              </Link>
            </motion.div>
          </div>

          {/* Right — Floating Cards */}
          <div className="lg:flex flex-col gap-5 relative">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-amber-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-16 rounded-2xl flex items-center justify-center shadow-md border border-amber-100">
                    <Image
                      src="/ansor_edu_logotip.png"
                      alt="logo"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {t("grantstitle")}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {t("grantssubtitle")}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    t("flight"),
                    t("accommodation"),
                    t("healthcare"),
                    t("allowance"),
                    t("meals"),
                    t("materials"),
                    t("transport"),
                    t("bonus"),
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={16}
                        className="text-green-500 shrink-0"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-amber-300 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Rank</span>
                  <span className="text-sm font-bold text-blue-700">#143</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
