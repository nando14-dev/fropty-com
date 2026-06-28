"use client";

import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddings = {
  none: "0",
  sm: "16px",
  md: "24px",
  lg: "32px",
};

export function Card({ hover = false, padding = "md", style, children, ...props }: CardProps) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: paddings[padding],
        transition: hover ? "border-color 0.2s, box-shadow 0.2s" : undefined,
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-hover)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
      } : undefined}
      onMouseLeave={hover ? (e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--card-border)";
        el.style.boxShadow = "";
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
