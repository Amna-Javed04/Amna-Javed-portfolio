import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.3), transparent 60%), #050507",
          color: "#f2f2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#a855f7",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 34, color: "#a1a1aa", marginTop: 12 }}>{site.role}</div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            marginTop: 40,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {site.description}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 72,
            fontSize: 20,
            color: "#a1a1aa",
          }}
        >
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
