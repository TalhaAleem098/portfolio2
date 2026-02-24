import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Aleem Talha — UI/UX Designer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Read the profile image from public folder
  const imageBuffer = await readFile(
    join(process.cwd(), "public", "images", "aleem.png")
  );
  const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#5477CC",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 60px 60px 80px",
            flex: 1,
            maxWidth: "65%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 48,
                height: 4,
                background: "#FDF94B",
                marginRight: 16,
              }}
            />
            <span
              style={{
                color: "#FDF94B",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            ALEEM
            <br />
            TALHA
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: 28,
            }}
          >
            UI/UX Designer & Full Stack Developer
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            {["React", "Next.js", "Figma", "Node.js"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "8px 16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 50,
                  color: "white",
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Profile Image */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "35%",
            position: "relative",
          }}
        >
          <img
            src={base64Image}
            alt="Aleem Talha"
            style={{
              height: "95%",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#FDF94B",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
