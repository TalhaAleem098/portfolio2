import HomeContent from '@/components/HomeContent';

export const metadata = {
  title: 'Aleem Talha — UI/UX Designer & Full Stack Developer',
  description:
    'Aleem Talha is a passionate UI/UX designer and full-stack developer crafting seamless digital experiences. Specializing in web design, app design, React, Next.js, and end-to-end product development.',
  keywords: [
    'Aleem Talha',
    'UI UX Designer',
    'Full Stack Developer',
    'Web Designer',
    'App Designer',
    'React Developer',
    'Next.js Developer',
    'Frontend Developer',
    'Portfolio',
    'Pakistan Developer',
    'Freelance Developer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aleem Talha — UI/UX Designer & Full Stack Developer',
    description:
      'Crafting seamless digital experiences through intuitive design and robust development. View my portfolio of web design, app design, and full-stack projects.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aleem Talha — UI/UX Designer & Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aleem Talha — UI/UX Designer & Full Stack Developer',
    description:
      'Crafting seamless digital experiences through intuitive design and robust development.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <HomeContent />;
}
