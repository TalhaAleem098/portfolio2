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
    <div className="px-1.5 md:px-3 lg:px-4 xl:px-6 pt-1.5 md:pt-3 lg:pt-4 xl:pt-6 pb-0 min-h-screen ">
      <Hero />
      <Services />
      <RecentWorks />
      <WorkProcess />
      <Testimonials />
      <MyWorkstation />
      <ProjectCTA />
      <Footer />
    </div>
  );
}
