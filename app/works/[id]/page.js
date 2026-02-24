import { notFound } from "next/navigation";
import projectsData from "@/public/data/projects.json";
import WorkPageContent from "@/components/WorkPageContent";

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title} — Aleem Talha | ${project.category} Project`;
  const description = `${project.tagline}. ${project.description.slice(0, 120)}... Built by Aleem Talha using ${project.technologies.join(', ')}.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      'Aleem Talha',
      ...project.technologies,
      'Portfolio Project',
      'Case Study',
      'UI UX Designer',
      'Full Stack Developer',
    ],
    alternates: {
      canonical: `/works/${project.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/works/${project.id}`,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1400,
          height: 800,
          alt: `${project.title} — Project by Aleem Talha`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Aleem Talha`,
      description,
      images: [project.image],
    },
  };
}

export default async function WorkPage({ params }) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) notFound();

  const currentIdx = projectsData.findIndex((p) => p.id === id);
  const prevProject = currentIdx > 0 ? projectsData[currentIdx - 1] : null;
  const nextProject = currentIdx < projectsData.length - 1 ? projectsData[currentIdx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Aleem Talha",
      jobTitle: "UI/UX Designer & Full Stack Developer",
      url: "https://github.com/AleemTalha",
      sameAs: [
        "https://github.com/AleemTalha",
        "https://www.linkedin.com/in/talha-aleem-a275a72a6/",
        "https://www.instagram.com/aleemtalha_dev/",
      ],
    },
    genre: project.category,
    dateCreated: project.year,
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkPageContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
