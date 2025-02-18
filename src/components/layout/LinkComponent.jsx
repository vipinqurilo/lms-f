import Link from "next/link";

export function LinkComponent({
  link,
  isCollapsed,
  isActive,
  handleIsHovered,
  isHovered,
}) {
  return (
    <Link
      key={link.href}
      href={link.href}
      prefetch={false}
      onMouseEnter={() => handleIsHovered(link?.href)}
      onMouseLeave={() => handleIsHovered(null)}
      className={`flex items-center gap-3 rounded-lg transition-colors relative
      ${
        isActive
          ? "text-background bg-gray-50"
          : "hover:text-background hover:bg-gray-50"
      } ${isCollapsed ? "p-2 justify-center" : "px-3 py-2"}`}
    >
      <link.icon className="w-6 h-6" />
      {isCollapsed && (
        <p
          className={`absolute top-1/2 -translate-y-1/2 left-[66px] text-sm !z-[20] bg-background px-2 py-1 rounded-full !text-white text-nowrap ${
            isHovered === link?.href ? "scale-100" : "scale-0"
          } transition-custom`}
        >
          {link.title}
        </p>
      )}
      <span className={`${isCollapsed ? "hidden" : "block"} transition-custom`}>
        {link.title}
      </span>
    </Link>
  );
}
