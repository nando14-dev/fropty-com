import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ width, height = 16, rounded = false, style, ...props }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: rounded ? "999px" : "6px",
        background: "var(--surface)",
        backgroundImage: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)",
        backgroundSize: "200% 100%",
        animation: "demoShimmer 1.6s linear infinite",
        ...style,
      }}
      {...props}
    />
  );
}
