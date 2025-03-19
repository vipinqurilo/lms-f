import React from "react";
import dateFormat from "dateformat";

const TicketCard = ({ ticket }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-black/10">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {ticket.subject}
        </h3>
        <span
          className={`px-2 mt-2 text-xs font-semibold rounded line-clamp-2 ${
            ticket.status === "open"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {ticket?.status?.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {ticket?.description}
      </p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{dateFormat(ticket.createdAt, "mmmm dS, yyyy")}</span>
      </div>
    </div>
  );
};

export default TicketCard;
