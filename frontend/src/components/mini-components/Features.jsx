import React from 'react';

function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-600">Features That Make a Difference</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SmartBin's innovative features help you optimize your waste management process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div
                class="px-4 pt-4 pb-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                data-v0-t="card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
                        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                        <line x1="8" x2="16" y1="21" y2="21"></line>
                        <line x1="12" x2="12" y1="17" y2="21"></line>
                    </svg>
            
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                Track the status of your waste bins in real-time and receive alerts for any issues.
                </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="px-4 pt-4 pb-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                        data-v0-t="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
                </svg>
                <h3 className="text-xl font-bold">Predictive Analytics</h3>
                <p className="text-muted-foreground">
                Leverage data-driven insights to optimize your waste collection routes and your schedules.
                </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="px-12 pt-4 pb-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
                    data-v0-t="card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12 text-primary">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                </svg>
                <h3 className="text-xl font-bold">Automated </h3>
                <p className="text-muted-foreground">
                Automate your waste collection schedules and reduce operational costs.
                </p>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Features;