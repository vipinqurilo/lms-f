import { PhoneCall } from "lucide-react";
import React from "react";

const Phone = ({ phone }) => {
  return (
    <div className="flex items-center gap-2 ">
      <span className="text-sm text-gray-500">
        <PhoneCall />
      </span>
      <span className="text-sm text-gray-500">{phone?.number}</span>
    </div>
  );
};

export default Phone;
