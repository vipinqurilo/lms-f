import React from "react";

const WhoWeAre = ({ data, heading }) => {
  return (
    <div className="w-full drop-shadow-md">
      <div
        className="w-full h-[40vh] lg:h-[60vh] flex items-center justify-center flex-col gap-4 bg-cover bg-center bg-no-repeat text-white px-5"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5887605042016807) 0%, rgba(0,0,0,0.6475840336134453) 100%), url("/assets/about/bgimage.png")`,
        }}
      >
        <h1 className="text-4xl lg:text-5xl lg:font-extrabold font-bold">
          {heading?.page}
        </h1>
        <p className="text-base lg:text-lg text-center max-w-3xl">
          {heading?.headings}
        </p>
      </div>

      <div className="custom-container space-y-6">
        <h6 className="text-2xl font-bold md:text-3xl lg:text-4xl max-w-3xl">
          {data?.subHeading}
        </h6>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data?.description?.map((des, i) => (
            <p key={i} className="text-light text-sm lg:text-base">
              {des}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
