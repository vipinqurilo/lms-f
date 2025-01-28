import React, { useState } from "react";
import data from "@/data/HeaderData.json";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { VscTriangleUp } from "react-icons/vsc";

const DeskTopMenu = ({ getLinkCss }) => {
  const [isSubMenuOpen, setisSubMenuOpen] = useState(null);

  const handleMouseEnter = (title) => {
    setisSubMenuOpen(title);
  };

  const handleMouseLeave = () => {
    setisSubMenuOpen(null);
  };

  return (
    <div className="hidden lg:flex items-center gap-4">
      {data?.mainNavItems?.map((item, index) => (
        <div
          className="relative"
          key={index}
          onMouseEnter={() => handleMouseEnter(item?.title)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-between text-base gap-2 font-medium group">
            <Link
              href={item?.href}
              onClick={(e) =>
                item?.items && item?.items?.length > 0 && e.stopPropagation()
              }
              className={`${getLinkCss} relative`}
            >
              {item?.title}
            </Link>
            {item?.items && item?.items?.length > 0 && (
              <FaAngleDown
                className={`${
                  isSubMenuOpen === item?.title ? "rotate-180" : "rotate-0"
                } transition-custom`}
              />
            )}
          </div>
          {item?.items &&
            item?.items?.length > 0 &&
            item?.title === isSubMenuOpen && (
              <div className="absolute top-full left-0">
                <div className="-mb-3.5 ml-2 text-white ">
                  <VscTriangleUp size={40} />
                </div>

                <ul className="min-w-full bg-white text-nowrap rounded border border-t-0">
                  {item?.items?.map((subLink, i) => (
                    <li
                      className=" text-light group w-full text-base border-b border-black/10 px-6 py-3"
                      key={i}
                    >
                      <Link
                        href={subLink?.href}
                        className={`${getLinkCss} w-full`}
                      >
                        {subLink?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default DeskTopMenu;
