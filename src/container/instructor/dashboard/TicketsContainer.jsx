import Link from "next/link";
import React from "react";
import TicketCard from "./TicketCard";

const TicketsContainer = ({ tickets, link }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">🎟️ Tickets</h2>
        <Link
          href={link}
          prefetch={false}
          className="hover:text-secondary font-medium text-xs transition-custom"
        >
          View All →
        </Link>
      </div>

      {/* Ticket List */}
      <div className="mt-4 space-y-4">
        {tickets?.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-4">
            🚫 No tickets available
          </div>
        ) : (
          tickets
            ?.slice(0, 2)
            .map((ticket, index) => <TicketCard ticket={ticket} key={index} />)
        )}
      </div>
    </div>
  );
};

export default TicketsContainer;
