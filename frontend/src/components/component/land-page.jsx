import React from 'react';
import Header from '@/components/mini-components/Header';
import Hero from '@/components/mini-components/Hero';
import Features from '@/components/mini-components/Features';
import HowItWorks from '@/components/mini-components/HowItWorks';
import Testimonials from '@/components/mini-components/Testimonials';
import CallToAction from '@/components/mini-components/CallToAction';
import Footer from '@/components/mini-components/Footer';


function LandPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default LandPage;