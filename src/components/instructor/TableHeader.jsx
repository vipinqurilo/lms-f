import React from "react";

const TableHeader = ({ headingsData }) => {
  return (
    <thead className="bg-gray-100 w-full">
      <tr>
        {headingsData?.map((heading, index) => (
          <th
            key={index}
            className="px-6 py-4 text-[15px] text-left font-semibold text-background"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
