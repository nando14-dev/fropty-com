import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fropty Apps — Seu app sob medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "#040316",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(91,87,232,0.25)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(239,159,39,0.12)",
            filter: "blur(80px)",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(91,87,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,87,232,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "64px 80px",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#5B57E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#fff",
                fontWeight: 800,
              }}
            >
              F
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
              Fropty<span style={{ color: "#5B57E8" }}>Apps</span>
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(91,87,232,0.2)",
                border: "1px solid rgba(91,87,232,0.3)",
                borderRadius: 999,
                padding: "6px 18px",
                width: "fit-content",
                color: "#A8B2FF",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ✦ Prévia 100% gratuita
            </div>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Seu app sob medida,{" "}
              <span style={{ color: "#5B57E8" }}>do jeito que você imaginou</span>
            </h1>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 28,
            }}
          >
            <div style={{ display: "flex", gap: 32 }}>
              {["R$ 0 para começar", "3 dias para a prévia", "a partir de R$ 499"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B57E8" }} />
                  {item}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.35)" }}>fropty.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
