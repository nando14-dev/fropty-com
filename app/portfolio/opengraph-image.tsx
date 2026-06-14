import { ImageResponse } from "next/og";
import { PORTFOLIO } from "../lib/data/portfolio";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PortfolioOGImage() {
  const items = PORTFOLIO.slice(0, 6);

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
        {/* BG blobs */}
        <div style={{ position: "absolute", top: -40, left: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(91,87,232,0.2)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -40, width: 380, height: 380, borderRadius: "50%", background: "rgba(239,159,39,0.1)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", display: "flex", height: "100%", width: "100%" }}>
          {/* Left panel */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 56px", width: 560 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#5B57E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", fontWeight: 800 }}>F</div>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Fropty<span style={{ color: "#5B57E8" }}>Apps</span></span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#A8B2FF", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B57E8" }} />
                Portfólio
              </div>
              <h1 style={{ fontSize: 56, fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em" }}>
                Apps que já <span style={{ color: "#5B57E8" }}>entregamos</span>
              </h1>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>
                Saúde, comércio, serviços, educação e gestão — todos sob medida.
              </p>
            </div>

            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.25)" }}>fropty.com/portfolio</span>
          </div>

          {/* Right panel — mini cards */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 48px 40px 0", gap: 12 }}>
            {[items.slice(0, 3), items.slice(3, 6)].map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, background: item.color, borderRadius: 4 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                        {item.tags.slice(0, 2).join(" · ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
