import { ImageResponse } from "next/og";
import { allPosts } from "../../lib/blog/posts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS: Record<string, string> = {
  Mercado:  "#EF9F27",
  Fropty:   "#5B57E8",
  Produto:  "#22c55e",
};

export default async function BlogOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  const title = post?.title ?? "Fropty Apps Blog";
  const description = post?.description ?? "";
  const category = post?.category ?? "Blog";
  const readTime = post?.readTime ?? 5;
  const accentColor = CATEGORY_COLORS[category] ?? "#5B57E8";
  const date = post ? new Date(post.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#040316",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent blob */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `${accentColor}30`,
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -40,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(91,87,232,0.2)",
            filter: "blur(80px)",
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: accentColor }} />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "60px 80px 60px 86px",
          }}
        >
          {/* Top: logo + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "#5B57E8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                F
              </div>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>
                Fropty<span style={{ color: "#5B57E8" }}>Apps</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, marginLeft: 8 }}>· Blog</span>
              </span>
            </div>
            <div
              style={{
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}50`,
                borderRadius: 999,
                padding: "6px 16px",
                color: accentColor,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          {/* Main title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "center" }}>
            <h1
              style={{
                fontSize: title.length > 50 ? 52 : 64,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: 20,
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: 820,
                }}
              >
                {description.length > 120 ? description.slice(0, 120) + "…" : description}
              </p>
            )}
          </div>

          {/* Bottom: date + read time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              color: "rgba(255,255,255,0.4)",
              fontSize: 15,
            }}
          >
            {date && <span>{date}</span>}
            {date && <span>·</span>}
            <span>{readTime} min de leitura</span>
            <span style={{ marginLeft: "auto" }}>fropty.com/blog</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
