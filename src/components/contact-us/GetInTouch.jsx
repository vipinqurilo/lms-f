import Link from "next/link";
import React from "react";

const GetInTouch = ({ data, imageArray }) => {
  return (
    <div
      className=" w-full h-full bg-secondary/20 rounded-md bg-cover bg-center bg-no-repeat text-black drop-shadow-md"
      style={{
        backgroundImage: `url("/assets/about/bgImage.svg")`,
      }}
    >
      <div className="py-5 lg:py-10 px-8 lg:px-10 h-full flex  flex-col justify-between">
        <div className=" flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold">Contact Information</h1>
          <h3 className="text-sm font-normal">
            Say something to start a live chat!
          </h3>
        </div>
        <div className="flex flex-col gap-6 py-5">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-lg lg:text-2xl">{item.icon}</div>
              <div className="text-sm lg:text-base ">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {imageArray.map((item, index) => (
            <Link
              href={item?.link}
              className="w-8 h-8 rounded-full bg-contain bg-center bg-no-repeat hover:border hover:border-black/10 transition-custom"
              style={{
                backgroundImage: `url(${item?.src})`,
              }}
              key={index}
            ></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
