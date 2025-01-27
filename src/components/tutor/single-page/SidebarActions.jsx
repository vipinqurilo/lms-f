import React from "react";
import { useDispatch } from "react-redux";
import { setIsAvailableModelOpen } from "../../../store/slices/uiSlice";

const SidebarActions = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* right side */}
      <div className="min-w-[400px] max-w-[400px] h-fit space-y-4 border shadow rounded-lg p-12 sticky top-4">
        <button
          onClick={() => dispatch(setIsAvailableModelOpen(true))}
          className="w-full py-3 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00] transition-colors"
        >
          Book now
        </button>
        <button className="w-full py-3 border border-[#FF9800] text-[#FF9800] rounded-lg hover:bg-orange-50 transition-colors">
          Contact
        </button>
        <button
          onClick={() => dispatch(setIsAvailableModelOpen(true))}
          className="block text-center text-[#FF9800] hover:underline"
        >
          View full availability
        </button>
        <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Book free trial
        </button>
        <div className="text-center text-sm text-gray-600">
          Trial lesson one time
        </div>
      </div>
    </div>
  );
};

export default SidebarActions;
