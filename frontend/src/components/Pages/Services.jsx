import React from 'react';
import Footer from '../mini-components/Footer';

const Services = () => {
  return (
    <div style={{ backgroundColor: 'rgba(224, 255, 230, 0.5)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <section className="text-center mb-12" >
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-64">
            <div className="flex flex-col items-center">
              <img src="service1.jpg" alt="Service 1" className="w-50 h-50 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Truck Tracking</h3>
              <p className="text-center">Stay informed with our real-time truck tracking feature. Residents can effortlessly view the live locations of garbage collection trucks in their area, ensuring you never miss a pickup.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="service2.jpg" alt="Service 2" className="w-50 h-50 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Pickup Schedules</h3>
              <p className="text-center">Plan your waste disposal efficiently with access to daily schedules. Our service provides up-to-date information on when garbage will be collected in your neighborhood, helping you stay organized.</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="service3.jpg" alt="Service 3" className="w-50 h-50 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Issue Reporting</h3>
              <p className="text-center">Encountered a problem? Our platform makes it simple for residents to report any issues related to waste management.</p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Services;