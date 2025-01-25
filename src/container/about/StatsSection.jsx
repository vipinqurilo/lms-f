import Image from "next/image";
import React from "react";

const StatsSection = ({ data }) => {
  return (
    <div className="custom-container bg-primary/5 space-y-10">
      <h1 className="text-2xl text-center font-semibold">
        Empowering Learners Worldwide with Proven Numbers
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-5"
          >
            <div className="w-20 h-20 bg-secondary/10 rounded-full drop-shadow-md flex items-center justify-center border-2 border-black/10">
              <Image
                src={stat?.image}
                alt={stat?.description}
                width={40}
                height={40}
              />
            </div>
            <div className="space-y-1 text-center">
              <h3 className="text-xl font-bold">{stat?.stat}</h3>
              <p className="text-light">{stat?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
