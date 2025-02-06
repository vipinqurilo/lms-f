import React from "react";

const EarningStats = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-4 gap-10">
      {data?.map((stat, index) => (
        <div key={index} className="w-full border border-black/10 rounded-lg py-5 px-5">
          <p>{stat?.title}</p>
          <h2 className="text-2xl font-bold">{stat?.amount}</h2>
          <p className="text-light/60 text-sm">{stat?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default EarningStats;
