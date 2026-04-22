"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";

export default function StatsSection() {
  const t = useTranslations("stats");

  const plugin = React.useRef(
    Autoplay({ 
      delay: 2000,         
      stopOnInteraction: false, 
      stopOnMouseEnter: false    
    })
  );

  const stats = [
    { value: t("universities"), label: t("universitiesLabel") },
    { value: t("years"), label: t("yearsLabel") },
    { value: t("success"), label: t("successLabel") },
    { value: t("universities"), label: t("universitiesLabel") },
    { value: t("years"), label: t("yearsLabel") },
    { value: t("success"), label: t("successLabel") },
  ];

  return (
    <section className="md:py-2 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true, 
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {stats.map((stat, i) => (
              <CarouselItem key={i} className="basis-1/3 md:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <p className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-blue-100 text-base font-medium sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}