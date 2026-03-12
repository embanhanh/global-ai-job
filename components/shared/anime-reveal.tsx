"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";

interface AnimeRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export function AnimeReveal({
  children,
  delay = 0,
  duration = 1000,
  stagger: staggerVal = 100,
  className = "",
  direction = "up",
  distance = 30,
  once = true,
}: AnimeRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = containerRef.current?.children;
    if (!targets || targets.length === 0) return;

    const targetsArray = Array.from(targets);

    // Initial state using utils.set (v4)
    utils.set(targetsArray, {
      opacity: 0,
      translateY: direction === "up" ? distance : direction === "down" ? -distance : 0,
      translateX: direction === "left" ? distance : direction === "right" ? -distance : 0,
    });

    const triggerAnimation = () => {
      animate(targetsArray, {
        opacity: [0, 1],
        translateY: 0,
        translateX: 0,
        delay: stagger(staggerVal, { start: delay }),
        duration,
        ease: "outExpo", // v4 uses 'ease' parameter and 'outExpo' naming
      });
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            if (once && observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [delay, duration, staggerVal, direction, distance, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
