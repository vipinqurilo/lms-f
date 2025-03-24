"use client";
import Image from "next/image";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./navbar/MobileMenu";
import DeskTopMenu from "./navbar/DeskTopMenu";
import NavbarTopContactBanner from "./navbar/NavbarTopContactBanner";
import { useSelector } from "react-redux";
import ProfileDropDown from "./common/ProfileDropDown";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.user);
  const [isScrolled, setisScrolled] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const toggleMenu = () => setisMenuOpen(!isMenuOpen);
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const frontendSettings = useSelector((state) => state.admin.settings?.frontendSettings || {});

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 100) {
        setisScrolled(true);
      } else {
        setisScrolled(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setisMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLinkCss = `text-black group-hover:!text-secondary transition-custom w-full md:w-fit`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[10] font-nunito shadow-md ${
        isScrolled
          ? "bg-white text-black"
          : "backdrop-blur bg-white/100 text-black"
      }`}
    >
      <NavbarTopContactBanner />
      <div className="w-full flex items-center justify-between custom-container !mt-0 !py-5 md:!py-4">
        <div className="flex items-center gap-2">
          <button onClick={toggleMenu} className="lg:hidden">
            <SlMenu size={30} />
          </button>
          <Link href={"/"}>
            <Image
              src={frontendSettings?.logo || "/assets/common/logo.png"}
              alt={frontendSettings?.title || "logo"}
              width={150}
              height={100}
              className="!object-cover object-center"
            />
          </Link>
        </div>
        <DeskTopMenu getLinkCss={getLinkCss} />

        {authUser && Object?.keys(authUser).length > 0 ? (
          <ProfileDropDown />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href={"/login"}
              className="px-5 py-1 rounded-full text-white bg-secondary hover:bg-black transition-custom"
            >
              Log in
            </Link>
            <Link
              href={"/register"}
              className={`px-5 py-1 rounded-full text-black hover:text-white border border-secondary hover:bg-secondary transition-custom hidden md:block ${
                isScrolled && "!text-black"
              }`}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <MobileMenu
          menuRef={menuRef}
          toggleMenu={toggleMenu}
          getLinkCss={getLinkCss}
        />
      )}
    </nav>
  );
};

export default Navbar;
