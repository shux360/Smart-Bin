import React from 'react';

function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How SmartBin Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our intuitive platform makes waste management a breeze.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="px-4 pt-4 pb-4 bg-orange-50 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                        data-v0-t="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
              <rect x="16" y="16" width="6" height="6" rx="1"></rect>
              <rect x="2" y="16" width="6" height="6" rx="1"></rect>
              <rect x="9" y="2" width="6" height="6" rx="1"></rect>
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
              <path d="M12 12V8"></path>
            </svg>
            <h3 className="text-xl font-bold">Connect Your Bins</h3>
            <p className="text-muted-foreground">Easily integrate your waste bins with our platform.</p>
          </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="px-4 pt-4 pb-4 bg-orange-50 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                        data-v0-t="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
              <rect width="20" height="14" x="2" y="3" rx="2"></rect>
              <line x1="8" x2="16" y1="21" y2="21"></line>
              <line x1="12" x2="12" y1="17" y2="21"></line>
            </svg>
            <h3 className="text-xl font-bold">Monitor and Optimize</h3>
            <p className="text-muted-foreground">Leverage real-time data to optimize your waste management.</p>
          </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="px-4 pt-4 pb-4 bg-orange-50 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                        data-v0-t="card">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-black">Streamline</h3>
            <p className="text-muted-foreground">Automate your waste collection and reduce operational costs.</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;