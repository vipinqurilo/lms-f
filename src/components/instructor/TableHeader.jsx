import React from "react";

const TableHeader = ({ headingsData }) => {
  console.log(headingsData,"lll")
  return (
    <thead className="bg-gray-100 w-full">
      <tr>
        {headingsData?.map((heading, index) => (
          <th
            key={index}
            className="px-6 py-4 text-left font-semibold text-background"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
