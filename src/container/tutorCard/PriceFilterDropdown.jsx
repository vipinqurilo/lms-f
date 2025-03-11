import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ReactSlider from "react-slider";
import { useSelector } from "react-redux";
import { setMaxPrice, setMinPrice } from "@/store/slices/tutorsSlice";
import { useDispatch } from "react-redux";

const PriceFilterDropdown = ({onClose}) => {
  const dispatch = useDispatch();
  // State for slider and inputs
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const {minPrice,maxPrice}=useSelector((state)=>state.tutors);
  // Handle input changes
  const handleMinPriceChange = (e) => {
    const value = Math.max(0, Math.min(e.target.value, priceRange[1])); // Clamp value
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.min(10000, Math.max(e.target.value, priceRange[0])); // Clamp value
    setPriceRange([priceRange[0], value]);
  };
  const handleApply = () => {
    dispatch(setMinPrice(priceRange[0]));
    dispatch(setMaxPrice(priceRange[1]));
    onClose();
  };
  const handleClear = () => {
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(10000));
    setPriceRange([0, 1000]);
    onClose();
  };
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute bottom-0 left-3 translate-y-[100%] z-[1000]"
    >
      <div className="w-[260px] flex flex-col justify-between h-[197px] bg-white rounded-lg relative mt-[12.8px]">
        <div className="w-0 h-0 absolute top-0 left-5 -translate-y-[96%] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[13px] border-b-white"></div>

        {/* Search */}
        <div className="p-4 relative flex gap-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-1/2 rounded-lg shadow border px-3 py-[6px] focus:outline-none"
            placeholder="Price from"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-1/2 rounded-lg shadow border px-3 py-[6px] focus:outline-none"
            placeholder="Price till"
          />
        </div>

        {/* Price selection (slider) */}
        <div className="px-4 py-2">
          <ReactSlider
            min={0}
            max={10000}
            step={10}
            value={priceRange}
            onChange={setPriceRange}
            renderTrack={(props, state) => (
              <div {...props} className="flex-1 h-2 bg-gray-200 rounded-full" />
            )}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="w-4 h-4 bg-black rounded-full absolute top-1 -translate-y-[50%]"
              />
            )}
          />
          <div className="flex justify-between mt-4 text-sm ">
            <span>&#8377;{priceRange[0]}</span>
            <span>&#8377;{priceRange[1]}</span>
          </div>
        </div>

        <hr />

        {/* Buttons */}
        <div className="py-2 px-4 relative flex justify-end gap-2">
          <button onClick={handleClear} className="px-5 py-1 rounded-lg bg-[#E9E8EB] text-black">
            Clear
          </button>
          <button onClick={handleApply} className="px-5 py-1 rounded-lg bg-black text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterDropdown;
