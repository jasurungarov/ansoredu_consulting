"use client";
 
import {Link} from '@/i18n/routing';
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import Image from 'next/image'
 
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();
 
  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/about", label: t('about') },
    { href: "/services", label: t('services') },
    { href: "/universities", label: t('universities') },
    { href: "/contact", label: t('contact') },
  ];
 
  const isActive = (href: string) => {
    // pathname includes locale, so we need to handle that
    const pathWithoutLocale = pathname.split('/').slice(2).join('/') || '/';
    const normalizedHref = href === '/' ? '/' : href.replace(/^\//, '');
    const normalizedPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
    
    return normalizedPath === (normalizedHref === '/' ? '/' : normalizedHref);
  }
 
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group p-6"
            aria-label="Ansor Edu - Home"
          >
            <div className="flex items-center justify-center ">
              <Image
                src="/ansor-edu-logo.png"
                alt="logo"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold text-amber-400
               tracking-tight">
                Ansor Edu
              </span>
              <span className="text-[10px] text-blue-600 font-medium tracking-widest uppercase">
                Edu Consulting
              </span>
            </div>
          </Link>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={link.href as any}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
 
          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
              {t('apply')}
            </Link>
          </div>
 
          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
 
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={link.href as any}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 px-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-sm"
                >
                  {t('apply')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
