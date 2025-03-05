import Link from "next/link";
import React from "react";

const NavigationLink = ({ path, text }) => {
  return (
    <Link
      href={path}
      className="bg-secondary hover:bg-background !transition-custom text-white px-6 py-2 w-fit rounded-full shadow-md text-nowrap"
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
