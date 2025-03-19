import React from "react";

const IncludesListRed = ({ list, type, heading }) => {
  return (
    <div className="p-4 px-6 border rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">{heading}</h3>
      <ul className="space-y-2">
        {list?.map((Item, index) => (
          <li key={index} className="flex items-center gap-2 border-b pb-2">
            {Item?.Icon && (
              <Item.Icon
                className={`${
                  type === "red" ? "text-secondary" : "text-blue-500"
                } text-xl`}
              />
            )}
            {!Item?.Icon && (
              <span
                className={`${
                  type === "red" ? "text-secondary" : "text-blue-500"
                }`}
              >
                -
              </span>
            )}
            <span className="font-medium">{Item?.text || Item}</span>
            {Item?.value && (
              <p className=" font-bold"> {Item?.value}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncludesListRed;
