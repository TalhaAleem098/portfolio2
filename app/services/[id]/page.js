import { notFound } from "next/navigation";
import servicesData from "@/public/data/services.json";
import ServicePageContent from "@/components/ServicePageContent";

export function generateStaticParams() {
  return servicesData.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  if (!service) return { title: "Service Not Found" };

  const title = `${service.title} — Aleem Talha | Professional ${service.title} Services`;
  const description = `${service.heroDescription} Aleem Talha delivers expert ${service.title.toLowerCase()} services with ${service.stats.projectsCompleted} projects completed and ${service.stats.clientSatisfaction} client satisfaction.`;

  return {
    title,
    description,
    keywords: [
      service.title,
      'Aleem Talha',
      ...service.technologies,
      `${service.title} Services`,
      'UI UX Designer',
      'Full Stack Developer',
      'Pakistan Developer',
    ],
    alternates: {
      canonical: `/services/${service.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.id}`,
      type: 'article',
      images: [
        {
          url: service.image,
          width: 800,
          height: 600,
          alt: `${service.title} — Aleem Talha`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} — Aleem Talha`,
      description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDescription,
    provider: {
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
    areaServed: "Worldwide",
    serviceType: service.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageContent service={service} />
    </>
  );
}
