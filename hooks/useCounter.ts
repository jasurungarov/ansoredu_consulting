"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;

      setCount(parseFloat(current.toFixed(decimals)));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isActive, start, end, duration, decimals]);

  return { count, elementRef };
}
