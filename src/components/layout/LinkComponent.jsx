import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function LinkComponent({
  link,
  isCollapsed,
  isActive,
  handleIsHovered,
  isHovered,
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Link */}
      <div
        className={`flex items-center gap-3 rounded-lg transition-colors cursor-pointer ${
          isActive
            ? "text-background bg-gray-50"
            : "hover:text-background hover:bg-gray-50"
        } ${isCollapsed ? "p-2 justify-center" : "px-3 py-2"} `}
        onMouseEnter={() => handleIsHovered(link?.href)}
        onMouseLeave={() => handleIsHovered(null)}
        onClick={(e) => {
          if (link.subLinks) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }else{
            router?.push(link?.href)
          }
        }}
      >
        <link.icon className="w-6 h-6" />
        {isCollapsed && (
          <p
            className={`absolute top-1/2 -translate-y-1/2 left-[66px] text-sm z-20 bg-background px-2 py-1 rounded-full text-white ${
              isHovered === link?.href ? "scale-100" : "scale-0"
            } transition-transform`}
          >
            {link.title}
          </p>
        )}
        <span className={`${isCollapsed ? "hidden" : "block"} transition-all`}>
          {link.title}
        </span>
        {link.subLinks && (
          <ChevronDown
            className={`w-4 h-4 ml-auto transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {/* Dropdown for subLinks (Dynamic Height) */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${link.subLinks.length * 40}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className=" shadow-md rounded-lg">
          {link?.subLinks?.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href || "#"}
              className={`flex items-center text-base text-white/90 gap-2 px-6 py-2 hover:bg-gray-100 bg-background hover:text-background rounded-lg ${
                !subLink.href ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <div className="w-3 h-3 bg-white/90 rounded-full"></div>
              <span>{subLink.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
