import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const GroupClassesSection = () => {
  return (
    <div>
      {/* Group Classes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Group classes</h2>
        <div className="border rounded-lg overflow-hidden max-w-[400px]">
          <div className="relative">
            <Image
              width={192}
              height={192}
              src="/assets/tutor/Marlenereilly.jpg"
              alt="classes"
              className=" object-cover h-[192px] w-full"
            />

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              4 Classes
            </div>
          </div>
          <div className="p-6">
            <div className="text-[#FF9800] font-medium mb-2">LITERATURE</div>
            <h3 className="text-xl font-bold mb-4">
              General Biology: The World of the Cell
            </h3>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div>Mar 06, 2025</div>
              <div>00:15 Onwards</div>
              <div>46 Seats</div>
            </div>
            <div className="text-2xl font-bold mb-6">$151.00</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  width={40}
                  height={40}
                  src="/assets/tutor/Marlenereilly.jpg"
                  alt="classes"
                  className=" object-cover rounded-lg"
                />

                <div>
                  <div className="font-medium">Ariel Bednar</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FF9800]" />
                    <span>4.00</span>
                    <span className="text-gray-500">(1)</span>
                  </div>
                </div>
              </div>
              <button className="ml-auto px-6 py-2 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00] transition-colors">
                Book now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupClassesSection;
