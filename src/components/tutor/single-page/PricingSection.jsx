import React from "react";

const PricingSection = () => {
  return (
    <div>
      {/* Pricing Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between font-medium mb-4">
            <div>Teaching subjects</div>
            <div>Slot price</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Genres</div>
            <div className="flex items-center gap-4">
              <div>$97.50</div>
              <select className="border rounded px-2 py-1">
                <option>30</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
