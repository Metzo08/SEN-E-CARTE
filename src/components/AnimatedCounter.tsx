"use client";

import React, { useEffect, useState } from "react";

export default function AnimatedCounter({
  to,
  suffix = "",
  durationMs = 1400,
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let rafId = 0;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to, durationMs]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
