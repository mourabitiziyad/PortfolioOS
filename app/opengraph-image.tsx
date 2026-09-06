import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ziyad Mourabiti - Engineering with range and rigor";
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
          justifyContent: "space-between",
          padding: "64px",
          background: "#f4efe5",
          color: "#1b1814",
          border: "20px solid #1b1814",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <strong>Ziyad Mourabiti</strong>
          <span style={{ color: "#6941c6" }}>Full-stack SWE @ SAP</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
          <span style={{ fontFamily: "serif", fontSize: 96, lineHeight: 0.95, letterSpacing: -5 }}>
            Engineering with
          </span>
          <span style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 108, lineHeight: 0.95, letterSpacing: -6, color: "#6941c6" }}>
            range and rigor.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23 }}>
          <span>Enterprise platforms · Applied AI · Data-intensive products</span>
          <span style={{ color: "#ee6c3d" }}>mourabitiziyad.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
