import servicesData from "@/public/data/services.json";
import projectsData from "@/public/data/projects.json";

const SITE_URL = "https://aleemtalha.vercel.app";

export default function sitemap() {
  const services = servicesData.map((s) => ({
    url: `${SITE_URL}/services/${s.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const works = projectsData.map((p) => ({
    url: `${SITE_URL}/works/${p.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...services,
    ...works,
  ];
}
