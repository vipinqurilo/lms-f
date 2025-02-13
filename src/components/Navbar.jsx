"use client";
import Image from "next/image";
import Link from "next/link";
import { SlMenu } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./navbar/MobileMenu";
import DeskTopMenu from "./navbar/DeskTopMenu";
import NavbarTopContactBanner from "./navbar/NavbarTopContactBanner";
import { useDispatch, useSelector } from "react-redux";
import { VscTriangleUp } from "react-icons/vsc";
import { logoutUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const profileData = [
    {
      title: "My Profile",
      href: "/profile",
      description: "View and edit your personal details",
    },
    {
      title: "Account Settings",
      href: "/profile/settings",
      description: "Manage your account preferences and security",
    },
    {
      title: "Notifications",
      href: "/profile/notifications",
      description: "Control your notification settings",
    },
    {
      title: "Payment Methods",
      href: "/profile/payments",
      description: "Manage your saved payment options",
    },
    {
      title: "Order History",
      href: "/profile/orders",
      description: "View your past purchases and transactions",
    },
    {
      title: "Logout",
      href: "#",
      description: "Sign out of your account securely",
      onClick: async (e) => {
        e.preventDefault();
        await dispatch(logoutUser());
        router.push("/login");
      },
    },
  ];

  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const [isScrolled, setisScrolled] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const toggleMenu = () => setisMenuOpen(!isMenuOpen);
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

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
              src={"/assets/common/logo.png"}
              alt="logo"
              width={150}
              height={100}
              className="!object-cover object-center"
            />
          </Link>
        </div>
        <DeskTopMenu getLinkCss={getLinkCss} />

        {authUser && Object?.keys(authUser).length > 0 ? (
          <div
            className="relative"
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setIsModalOpen(false)}
          >
            <div className="w-10 h-10 rounded-full border border-black/10 relative overflow-hidden cursor-pointer">
              <Image
                src={"/assets/about/founder1.jpg"}
                alt="profile image"
                fill={true}
                className="object-cover object-center "
              />
            </div>
            {isModalOpen && (
              <div className="absolute top-full right-0 pt-2">
                <div className="-mb-3.5 w-full flex items-center justify-end text-white ">
                  <VscTriangleUp size={40} />
                </div>

                <ul className="min-w-full bg-white text-nowrap rounded border border-t-0">
                  {profileData?.map((subLink, i) => (
                    <li
                      className=" text-light group w-full text-base border-b border-black/10 px-6 py-3"
                      key={i}
                    >
                      <Link
                        href={subLink?.href}
                        onClick={subLink?.onClick}
                        className={`text-black group-hover:!text-secondary transition-custom w-full md:w-fit`}
                      >
                        {subLink?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
