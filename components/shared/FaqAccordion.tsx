"use client";

import { useMemo, useState, type ReactElement } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Building2,
  Gift,
  GraduationCap,
  FileCheck,
  FileText,
  Languages,
  Clock,
  Plane,
  Home,
  Globe2,
  HeartPulse,
  Wallet,
  Users,
  Award,
  ShieldCheck,
  Settings,
  MessageCircle,
  Search,
  HelpCircle,
} from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; icon: string; items: FaqItem[] };

interface Props {
  categories: FaqCategory[];
  searchPlaceholder: string;
  notFoundText: string;
}

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Statik switch-case — har bir ikonka literal (import qilingan) komponent
 * sifatida render qilinadi. Bu react-hooks/static-components qoidasiga
 * mos keladi, chunki JSX tegi runtime'da tanlangan o'zgaruvchi emas.
 */
function renderCategoryIcon(key: string, props: IconProps): ReactElement {
  switch (key) {
    case "building2":
      return <Building2 {...props} />;
    case "gift":
      return <Gift {...props} />;
    case "graduation-cap":
      return <GraduationCap {...props} />;
    case "file-check":
      return <FileCheck {...props} />;
    case "file-text":
      return <FileText {...props} />;
    case "languages":
      return <Languages {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "plane":
      return <Plane {...props} />;
    case "home":
      return <Home {...props} />;
    case "globe-2":
      return <Globe2 {...props} />;
    case "heart-pulse":
      return <HeartPulse {...props} />;
    case "wallet":
      return <Wallet {...props} />;
    case "users":
      return <Users {...props} />;
    case "award":
      return <Award {...props} />;
    case "shield-check":
      return <ShieldCheck {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "message-circle":
      return <MessageCircle {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
}

export default function FaqAccordion({
  categories,
  searchPlaceholder,
  notFoundText,
}: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) ||
            item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query, isSearching]);

  const activeCategory = categories[activeIndex];

  return (
    <div>
      {/* Qidiruv paneli */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-11 h-12 rounded-full"
        />
      </div>

      {isSearching ? (
        /* ------- QIDIRUV NATIJALARI ------- */
        <div className="max-w-3xl mx-auto">
          {searchResults.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {notFoundText}
            </p>
          ) : (
            <div className="space-y-8">
              {searchResults.map((cat, ci) => (
                <div key={ci}>
                  <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-blue-700">
                    {renderCategoryIcon(cat.icon, { size: 16 })}
                    {cat.title}
                  </div>
                  <Accordion type="single" collapsible className="space-y-2">
                    {cat.items.map((item, ii) => (
                      <AccordionItem
                        key={ii}
                        value={`${ci}-${ii}`}
                        className="border border-border rounded-xl px-4 bg-card"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* ------- MOBIL: Select dropdown (lg dan kichik ekranlarda) ------- */}
          <div className="lg:hidden mb-6">
            <Select
              value={String(activeIndex)}
              onValueChange={(v) => setActiveIndex(Number(v))}
            >
              <SelectTrigger className="w-full h-14 rounded-2xl px-4 [&>span]:flex [&>span]:items-center [&>span]:gap-3 bg-blue-600">
                <SelectValue>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ">
                      {renderCategoryIcon(activeCategory.icon, {
                        size: 16,
                        className: "text-white",
                      })}
                    </div>
                    <span className="font-medium text-white">{activeCategory.title}</span>
                    <Badge variant="outline" className="ml-2 text-xs text-white/80 ">
                      {activeCategory.items.length}
                    </Badge>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[60vh]">
                {categories.map((cat, i) => (
                  <SelectItem key={i} value={String(i)} className="py-3">
                    <div className="flex items-center gap-3">
                      {renderCategoryIcon(cat.icon, {
                        size: 16,
                        className: "text-black shrink-0",
                      })}
                      <span>{cat.title}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({cat.items.length})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ------- DESKTOP: sidebar + content ------- */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            <div className="hidden lg:block lg:sticky lg:top-24">
              <div className="flex flex-col gap-2">
                {categories.map((cat, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border transition-all",
                        active
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "bg-card border-border text-foreground hover:border-blue-300 hover:bg-blue-50/50"
                      )}
                    >
                      {renderCategoryIcon(cat.icon, {
                        size: 18,
                        className: cn("shrink-0", active ? "text-white" : "text-blue-600"),
                      })}
                      <span className="text-sm font-medium flex-1">{cat.title}</span>
                      <Badge
                        variant={active ? "secondary" : "outline"}
                        className={cn(
                          "shrink-0 text-xs",
                          active
                            ? "bg-white/20 text-white border-transparent"
                            : "text-muted-foreground"
                        )}
                      >
                        {cat.items.length}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* O'ng tomon / mobil uchun asosiy kontent */}
            <div className="min-h-100">
              <div className="hidden lg:flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  {renderCategoryIcon(activeCategory.icon, {
                    size: 20,
                    className: "text-blue-600",
                  })}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {activeCategory.title}
                </h3>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {activeCategory.items.map((item, ii) => (
                  <AccordionItem
                    key={ii}
                    value={`item-${ii}`}
                    className="border border-border rounded-2xl px-4 sm:px-5 bg-card shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
