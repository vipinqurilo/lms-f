import React from 'react';

const Tooltip = ({ 
  children, 
  text, 
  position = "top", 
  className = "",
  tooltipClassName = ""
}) => {
  // Determine position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "-top-12 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "top-1/2 -left-2 -translate-y-1/2 -translate-x-full";
      case "right":
        return "top-1/2 -right-2 -translate-y-1/2 translate-x-full";
      default:
        return "-top-12 left-1/2 -translate-x-1/2";
    }
  };

  // Determine arrow position classes
  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black";
      case "bottom":
        return "h-0 w-fit border-l-8 border-r-8 border-b-8 border-transparent border-b-black";
      case "left":
        return "h-0 w-fit border-t-8 border-b-8 border-l-8 border-transparent border-l-black";
      case "right":
        return "h-0 w-fit border-t-8 border-b-8 border-r-8 border-transparent border-r-black";
      default:
        return "h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black";
    }
  };

  return (
    <div className={`group  relative inline-flex ${className}`}>
      {children}
      <div className="hidden group-hover:block">
        <div
          className={`group absolute z-50 flex flex-col items-center rounded-sm text-center text-sm text-slate-300 ${getPositionClasses()} ${tooltipClassName}`}
        >
          <div className="rounded-sm bg-black py-1 px-2">
            <p className="whitespace-nowrap">{text}</p>
          </div>
          <div className={getArrowClasses()}></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
