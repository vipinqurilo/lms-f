import Image from "next/image";
import React from "react";

const ReviewsSection = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      {/* Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Review</h2>
        <div className="flex items-baseline gap-4 mb-8">
          <div className="text-5xl font-bold">4.00</div>
          <div className="text-gray-600">Overall ratings</div>
        </div>
        <div className="flex justify-end mb-6">
          <select
            className="border rounded-lg px-4 py-2"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="newest">Sort by newest</option>
            <option value="oldest">Sort by oldest</option>
          </select>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Image
              width={40}
              height={40}
              src="/assets/tutor/Marlenereilly.jpg"
              alt="classes"
              className=" object-cover rounded-lg h-[47px] w-[47px]"
            />
            <div>
              <div className="font-medium">Jarod Dach</div>
              <div className="text-gray-600 text-sm">Oct 05, 2024 07:14</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="font-medium">Really liked the Session</div>
                <div className="text-[#FF9800]">4</div>
              </div>
              <p className="mt-2">Really liked the Session</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
