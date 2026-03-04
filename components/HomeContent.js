'use client';

import RecentWorks from '@/components/RecentWorks';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WorkProcess from '@/components/WorkProcess';
import Testimonials from '@/components/Testimonials';
import MyWorkstation from '@/components/MyWorkstation';
import ProjectCTA from '@/components/ProjectCTA';
import Footer from '@/components/Footer';

export default function HomeContent() {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden">
      <Hero />
      <div className="h-screen md:h-[100vh]" aria-hidden="true" />
      <div className="relative z-20">
        <Services />
        <RecentWorks />
        <WorkProcess />
        <Testimonials />
        <MyWorkstation />
        <ProjectCTA />
        <Footer />
      </div>
    </div>
  );
}
