"use client";

import React from "react";

interface ShineBorderProps {
  children: React.ReactNode;
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  style?: React.CSSProperties;
}

export function ShineBorder({
  children,
  borderRadius = 16,
  borderWidth = 1,
  duration = 14,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  style,
}: ShineBorderProps) {
  const colors = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

  return (
    <div style={{ position: "relative", borderRadius, overflow: "hidden", ...style }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          padding: borderWidth,
          backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
          backgroundSize: "300% 300%",
          animation: `fropty-shine ${duration}s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}
