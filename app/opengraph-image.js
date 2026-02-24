import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aleem Talha — UI/UX Designer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#5477CC",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              backgroundColor: "#FDF94B",
              borderRadius: "2px",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#FDF94B",
              fontSize: "16px",
              fontWeight: 900,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "white",
            lineHeight: 1.05,
            margin: "0 0 16px 0",
            letterSpacing: "-1px",
          }}
        >
          Aleem Talha
        </h1>

        {/* Role */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            margin: "0 0 40px 0",
          }}
        >
          UI/UX Designer & Full Stack Developer
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
          }}
        >
          {[
            { value: "2.5+", label: "Years Experience" },
            { value: "15+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#FDF94B",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "1px",
            }}
          >
            aleemtalha.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
