import React from 'react';
import img01 from '@/components/img/img01.svg';
import { Link } from 'react-router-dom';

function Hero() {
  const role=localStorage.getItem('role');
  return (
    <section className="w-full py-12 md:py-24 lg:py-64">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            src={img01}
            width="600"
            height="600"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:w-max animate-fade-in"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in-up">
                Revolutionize Your Waste Management
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                SmartBin - The Intelligent Waste Solution
              </p>
            </div>
            <div className="flex flex-col gap-10 min-[400px]:flex-row">
              
              <Link to= {role == 'user'?'#':`/signin/${'driver'}`} 
                className="inline-flex h-10 items-center justify-center rounded-md bg-orange-600 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 animate-fade-in-up"
                
              >
                Join as a Driver
              </Link>
              <a href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-orange-600 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 animate-fade-in-up"
              >
                Join as a User
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;