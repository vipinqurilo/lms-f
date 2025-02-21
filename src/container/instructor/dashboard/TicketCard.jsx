import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-black/10">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {ticket.subject}
        </h3>
        <span
          className={`px-2 text-xs font-semibold rounded ${
            ticket.status === "open"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ticket?.status?.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{ticket?.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Category: {ticket?.category}</span>
        <span>{new Date(ticket?.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TicketCard;
