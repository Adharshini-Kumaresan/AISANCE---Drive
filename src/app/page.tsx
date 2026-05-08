'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import ImpactSection from '@/components/ImpactSection';
import DifferentiationSection from '@/components/DifferentiationSection';
import WhyNowSection from '@/components/WhyNowSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div style={{ cursor: 'none' }}>
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <ValuePropositionSection />
          <ImpactSection />
          <DifferentiationSection />
          <WhyNowSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
