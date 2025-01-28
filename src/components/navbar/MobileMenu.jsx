import Image from "next/image";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import data from "@/data/HeaderData.json";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";

const MobileMenu = ({ menuRef, toggleMenu, getLinkCss }) => {
  const [isSubMenuOpen, setisSubMenuOpen] = useState(null);
  const toggleSubMenu = (val) => setisSubMenuOpen(val);

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      data-aos="fade-right"
      data-aos-duration="500"
      className={`w-[80%] h-screen lg:hidden fixed top-0 left-0 z-[12] bg-white py-10 shadow-xl flex flex-col gap-8`}
    >
      <button
        data-aos="fade-right"
        data-aos-duration="500"
        className="border border-black/10 p-2 rounded absolute top-5 -right-12 bg-background text-white"
        onClick={toggleMenu}
      >
        <RxCross1 size={25} />
      </button>
      <Link href={"/"}>
        <Image
          src={"/assets/common/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="!object-cover object-center "
        />
      </Link>

      <div className="w-full px-5 space-y-4">
        {data?.mainNavItems?.map((item, index) => (
          <div className="" key={index}>
            <div className="w-full flex items-center justify-between text-xl font-medium group">
              <Link
                href={item?.href}
                onClick={(e) =>
                  item?.items && item?.items?.length > 0 && e.stopPropagation()
                }
                className={`${getLinkCss}`}
              >
                {item?.title}
              </Link>
              {item?.items && item?.items?.length > 0 && (
                <button
                  onClick={() =>
                    isSubMenuOpen === item?.title
                      ? toggleSubMenu(null)
                      : toggleSubMenu(item?.title)
                  }
                >
                  <FaAngleDown
                    className={`${
                      isSubMenuOpen === item?.title ? "rotate-180" : "rotate-0"
                    } transition-custom`}
                  />
                </button>
              )}
            </div>
            {item?.items &&
              item?.items?.length > 0 &&
              item?.title === isSubMenuOpen && (
                <ul className="w-full px-8 py-2">
                  {item?.items?.map((subLink, i) => (
                    <li
                      className="list-disc text-light group w-full text-lg"
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
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
