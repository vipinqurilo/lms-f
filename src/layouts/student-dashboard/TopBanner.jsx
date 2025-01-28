import { usePathname } from "next/navigation";
import React from "react";

const TopBanner = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const title =
    paths.length > 0 ? paths[paths.length - 1].replace(/-/g, " ") : "Dashboard";
  const breadcrumbs = ["Home", ...paths.map((path) => path.replace(/-/g, " "))];

  return (
    <div
      className="w-full bg-white max-h-[250px] min-h-[250px] bg-cover bg-no-repeat bg-center flex justify-center items-center text-center"
      style={{
        backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/bg/breadcrumb-bar.png')`,
      }}
    >
      <div>
        <h1 className="text-4xl font-bold text-dark mb-2 capitalize">
          {title}
        </h1>
        <div className="flex items-center justify-center text-sm text-gray-500 font-bold capitalize">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-primary"
                    : "text-dark capitalize"
                }
              >
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">-</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
