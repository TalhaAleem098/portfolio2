import { ImageResponse } from "next/og";

export const alt = "Services — Aleem Talha | UI/UX Design & Full Stack Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const services = [
  { title: "Web Design", count: "30+", color: "#FDF94B" },
  { title: "App Design", count: "20+", color: "#FF6B9D" },
  { title: "Front-End Dev", count: "25+", color: "#61DAFB" },
  { title: "Back-End Dev", count: "18+", color: "#68D391" },
  { title: "360 Development", count: "15+", color: "#C084FC" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#5477CC",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
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

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                fontSize: "15px",
                fontWeight: 900,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              What I Offer
            </span>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              margin: "0 0 12px 0",
              letterSpacing: "-1px",
              textTransform: "uppercase",
            }}
          >
            My Services
          </h1>

          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: "600px",
            }}
          >
            Comprehensive design & development services from concept to deployment
          </p>
        </div>

        {/* Services pills */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                borderRadius: "40px",
                border: "2px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: s.color,
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {s.title}
              </span>
              <span
                style={{
                  color: s.color,
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "1px",
            }}
          >
            Aleem Talha — aleemtalha.codes
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
