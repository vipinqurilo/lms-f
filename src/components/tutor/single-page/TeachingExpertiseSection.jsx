import React from "react";

const TeachingExpertiseSection = () => {
  return (
    <div>
      {/* Teaching Expertise */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Teaching expertise</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Accents</h3>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                British English
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Learner ages</h3>
            <div className="flex gap-4">
              {["12 Years to 18 Years", "18+ Years"].map((age, index) => (
                <span key={index} className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                  {age}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeachingExpertiseSection;
