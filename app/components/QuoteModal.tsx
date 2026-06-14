"use client";

export function QuoteButton({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("orcamento");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      href="#orcamento"
      onClick={scrollToForm}
      className={className}
      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", ...style }}
    >
      {children}
    </a>
  );
}
