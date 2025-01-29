import React from "react";

const IncludesListRed = ({ list, type, heading }) => {
  return (
    <div className="p-4 px-6 border rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">{heading}</h3>
      <ul className="space-y-2">
        {list?.map(({ Icon, value, text }, index) => (
          <li key={index} className="flex items-center gap-2 border-b pb-2">
            <Icon className={`${type === "red" ? "text-primary" : "text-blue-500"} text-xl`} />
            <span className="font-medium">{text}:</span>
            <p className="font-mono font-bold">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncludesListRed;
