"use client";

import { Link } from "@/i18n/routing";
import { Mail, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-amber-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="flex items-center justify-center ">
                <Image
                  src="/ansor-edu-logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-xl font-bold text-amber-400 tracking-tight">
                Ansor Edu
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex items-center gap-4">
              {[
                {
                  icon: <FaInstagram size={18} />,
                  href: "https://www.instagram.com/ansor_edu_/",
                },
                {
                  icon: <FaWhatsapp size={18} />,
                  href: "https://api.whatsapp.com/send?phone=+996557858446",
                },
                {
                  icon: <Send size={18} />,
                  href: "https://t.me/ansor_edu_admin",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/about", label: tNav("about") },
                { href: "/services", label: tNav("services") },
                { href: "/universities", label: tNav("universities") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={link.href as any}
                    className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <TbBrandTelegram size={22} className="text-blue-600 shrink-0" />
                <a
                  href={"https://t.me/ansor_edu_admin"}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t("telegramSubtitle")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600 shrink-0" />
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 shrink-0" />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
              {tNav("apply")}
            </h4>
            <p className="text-sm text-gray-500 mb-6">{t("subtitle")}</p>
            <Link href="/contact" className="btn-primary w-full text-xs py-3">
              {tNav("apply")}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Ansor Edu. {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
              {t("privacy")}
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
