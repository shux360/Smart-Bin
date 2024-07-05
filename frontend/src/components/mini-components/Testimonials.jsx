import React from 'react';
import avatar01 from '@/components/img/avatar01.jpg';

function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-600">What Our Customers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied customers about their experience with SmartBin.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <img
              src={avatar01}
              width="50"
              height="50"
              alt="Avatar"
              className="rounded-full"
    
            />
            <div>
              <p className="text-lg font-medium ">John Doe</p>
              <p className="text-muted-foreground ">Waste Management Supervisor</p>
            </div>
            <p className="text-muted-foreground">
              "SmartBin has revolutionized our waste management process. The real-time monitoring and predictive
              analytics have helped us optimize our routes and reduce operational costs."
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <img
              src="/placeholder.svg"
              width="50"
              height="50"
              alt="Avatar"
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-medium">Jane Smith</p>
              <p className="text-muted-foreground">Sustainability Manager</p>
            </div>
            <p className="text-muted-foreground">
              "I highly recommend SmartBin to any organization looking to improve their waste management. The
              automated scheduling and reporting features have been a game-changer for us."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;