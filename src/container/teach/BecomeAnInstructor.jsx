import Image from "next/image";
import React from "react";

const BecomeAnInstructor = () => {
  return (
    <div className="custom-container flex flex-col md:flex-row gap-10">
      <div className="w-full h-full flex flex-col gap-2 lg:gap-5">
        <h2 className="text-left text-xl md:text-3xl lg:text-4xl font-bold">Become an Instuctor</h2>
        <p className="lg:text-lg">
          Become an instructor & start teaching with 26k certified instructors.
          Create a success story with 67.1k Students — Grow yourself with 71
          countries.
        </p>
        <button className="px-7 py-3 bg-[#FF6636] text-white rounded-lg w-fit">
          Get Started
        </button>
      </div>
      <div className="w-full h-[40vh] md:h-[20vh] lg:h-[300.53px] relative">
        <Image
          src={"/assets/common/image.svg"}
          alt="image"
          fill={true}
          className="object-contain object-center w-full h-full"
        />
      </div>
    </div>
  );
};

export default BecomeAnInstructor;
