import React from 'react';
import { aboutImages } from '../../assets/assets';

function About() {
  return (
    <div className="px-6 sm:px-16 lg:px-24 py-16">
      {/* Heading */}
      <div className="relative inline-block mb-8 py-3">
        <h2 className="text-black text-2xl sm:text-3xl font-normal inline-block">
          ABOUT <span className="font-bold">US</span>
        </h2>
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black"></span>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {aboutImages.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              className="w-64 h-80 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105"
              src={item.src}
              alt={item.title}
            />
            <p className="text-black text-sm sm:text-base mt-3 text-center font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
          Welcome to <span className="font-semibold text-black">PantriPick</span>, your trusted neighborhood grocery store.  
          Since our humble beginnings in 1997 in Ahmedabad, we have been committed to bringing the best quality products to our customers.  
          What started as a small family-run store has now expanded into three thriving branches across Ahmedabad, Vadodara, and Surat.
        </p>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mt-4">
          At PantriPick, we believe in providing a seamless shopping experience by combining affordable pricing, premium quality, and exceptional customer service.  
          We source fresh, locally grown produce and stock a wide range of essential grocery items to meet the needs of every household.
        </p>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mt-4">
          Over the years, we have built a strong bond with our customers, thanks to our unwavering dedication to quality and service.  
          Whether you're here for a quick grocery run or preparing for a special occasion, our stores are designed to offer everything you need under one roof.
        </p>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mt-4">
          As we continue to grow, our mission remains the same—to make everyday shopping effortless, enjoyable, and affordable.  
          Thank you for being part of our journey. We look forward to serving you for many years to come!  
        </p>
      </div>
    </div>
  );
}

export default About;
