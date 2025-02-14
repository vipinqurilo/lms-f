import { setIsContactModelOpen } from "@/store/slices/uiSlice";
import React from "react";
import { useDispatch } from "react-redux";

const SidebarActions = ({ setShowBooking }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* right side */}
      <div className="w-full lg:min-w-[400px] lg:max-w-[400px] h-fit space-y-4 border shadow rounded-lg p-4 mb-6 lg:mb-0 lg:p-12 static lg:sticky top-4">
        <button
          onClick={() => setShowBooking(true)}
          className="w-full py-3 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00] transition-colors"
        >
          Book now
        </button>
        <button
          onClick={() => dispatch(setIsContactModelOpen(true))}
          className="w-full py-3 border border-[#FF9800] text-[#FF9800] rounded-lg hover:bg-orange-50 transition-colors"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default SidebarActions;
