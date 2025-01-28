import Image from "next/image";
import React from "react";

const WhoWeAre = ({ data, heading }) => {
  const images = [
    "/assets/about/about.jpg",
    "/assets/about/image2.webp",
    "/assets/about/image3.webp",
    "/assets/about/image4.webp",
  ];

  return (
    <div className="w-full  drop-shadow-md">
      <div
        className="w-full h-[40vh] lg:h-[60vh] flex items-center justify-center flex-col gap-4 bg-cover bg-center bg-no-repeat text-white bg-blue-500"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 50% 90%, 50% 90%, 0 100%)`,
          // backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url("/assets/about/bgimage.png")`,
          // backgroundImage: `url("/assets/about/bgImage.svg")`,
        }}
      >
        <h1 className="text-4xl lg:text-5xl lg:font-extrabold font-bold">
          {heading?.page}
        </h1>
        <p className="text-base lg:text-lg text-center">
          {heading?.headings?.[0]} {heading?.headings?.[1]}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 sm:px-10 lg:px-20 -mt-10 md:-mt-20 lg:-mt-28">
        {images?.map((img, index) => (
          <div
            key={index}
            className={`relative w-full h-[40vh] md:h-[30vh] lg:h-[40vh] ${
              index % 2 !== 0 && "md:!h-[30vh] lg:my-auto"
            } ${index > 0 && "hidden sm:block lg:my-auto"} ${
              index > 1 && "sm:hidden lg:block lg:my-auto"
            }`}
          >
            <Image
              src={img}
              alt="image"
              fill={true}
              className="w-full object-cover rounded border border-black/20"
            />
          </div>
        ))}
      </div>

      <div className="w-full px-5 sm:px-10 lg:px-20 mt-8 space-y-6">
        <h6 className="text-xl font-bold md:text-2xl lg:text-3xl">
          {data?.subHeading}
        </h6>
        {data?.description?.map((des, i) => (
          <p key={i} className="text-light">
            {des}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WhoWeAre;
