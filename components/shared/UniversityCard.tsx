"use client";

import { Link } from "@/i18n/routing";
import { University } from "@/lib/universities-data";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  LayoutGrid,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface UniversityCardProps {
  university: University;
  className?: string;
}

export default function UniversityCard({
  university,
  className,
}: UniversityCardProps) {
  const t = useTranslations("universities");
  const locale = useLocale() as keyof University["name"];

  return (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
        className,
      )}>
      {/* Header */}
      <div className="relative h-44 bg-linear-to-br from-blue-700 to-blue-900 p-6 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white flex justify-center items-center">
            <Image
              src={university.logo ?? ""}
              alt='logo'
              width={140}
              height={140}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white">
            <Image
              src={"/ansor_edu_logotip.png"}
              alt="universitiesLogo"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-2">
          {university.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-0.5 text-xs font-medium text-white">
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <div className="relative">
          <h3 className="text-lg font-extrabold text-white leading-tight">
            {university.name[locale]}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={12} className="text-blue-200" />
            <span className="text-blue-200 text-xs">
              {university.location[locale]}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">
          {university.description[locale]}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              icon: <Users size={14} />,
              label: t("students"),
              value: university.students,
            },
            {
              icon: <LayoutGrid size={14} />,
              label: t("faculties"),
              value: university.faculties.toString(),
            },
            {
              icon: <TrendingUp size={14} />,
              label: t("ranking"),
              value: university.ranking ? `#${university.ranking}` : "N/A",
            },
            {
              icon: <span className="text-xs">📅</span>,
              label: t("founded"),
              value: university.founded,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex justify-center text-blue-600 mb-1">
                {stat.icon}
              </div>
              <p className="text-sm font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grant type badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Full Grant
          </span>
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={`/universities/${university.slug}` as any}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            {t("learnMore")}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
