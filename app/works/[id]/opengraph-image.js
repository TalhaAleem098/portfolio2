import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import projectsData from "@/public/data/projects.json";

export const alt = "Project — Aleem Talha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS = {
  "Front-End": { accent: "#61DAFB", bg2: "rgba(97,218,251,0.12)" },
  "Mobile": { accent: "#FF6B9D", bg2: "rgba(255,107,157,0.12)" },
  "Full-Stack": { accent: "#FDF94B", bg2: "rgba(253,249,75,0.12)" },
  "Design": { accent: "#C084FC", bg2: "rgba(192,132,252,0.12)" },
};

function getImageSrc(imagePath) {
  try {
    const filePath = join(process.cwd(), "public", imagePath);
    const data = readFileSync(filePath);
    const ext = imagePath.endsWith(".webp") ? "webp" : "png";
    return `data:image/${ext};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image({ params }) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#5477CC", color: "white", fontSize: "48px", fontWeight: 900, fontFamily: "system-ui, sans-serif" }}>
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

  const colors = CATEGORY_COLORS[project.category] || { accent: "#FDF94B", bg2: "rgba(253,249,75,0.12)" };
  const imgSrc = getImageSrc(project.image);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#5477CC",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Right side — project image */}
        {imgSrc && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "480px",
              height: "100%",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <img
              src={imgSrc}
              width={480}
              height={630}
              alt={project.title}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, #5477CC 0%, rgba(84,119,204,0.6) 40%, rgba(84,119,204,0.15) 100%)",
                display: "flex",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Category + year */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span
                style={{
                  padding: "6px 18px",
                  borderRadius: "20px",
                  backgroundColor: colors.accent,
                  color: "#1a1a2e",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px" }}>
                {project.year} · {project.duration}
              </span>
            </div>

            <h1 style={{ fontSize: "54px", fontWeight: 900, color: "white", lineHeight: 1.1, margin: "0 0 14px 0", letterSpacing: "-1px" }}>
              {project.title}
            </h1>

            <p style={{ fontSize: "20px", fontWeight: 500, color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: "580px", lineHeight: 1.4 }}>
              {project.tagline}
            </p>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            {/* Results */}
            <div style={{ display: "flex", gap: "32px" }}>
              {project.results &&
                Object.entries(project.results).map(([key, value]) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "26px", fontWeight: 900, color: colors.accent }}>{value}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
            </div>

            {/* Tech pills */}
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "360px" }}>
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} style={{ padding: "5px 14px", borderRadius: "16px", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: 700 }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Branding */}
          <div style={{ position: "absolute", bottom: "20px", left: "72px", display: "flex" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "1px" }}>
              Aleem Talha — aleemtalha.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
