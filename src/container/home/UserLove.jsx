import React from "react";
import Testimonial from "@/components/common/Testimonial";

export default function UserLove() {
  return (
    <div>
      <div
        className=" bg-cover h-[80vh]  w-full relative"
        style={{
          backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/user-love.jpg')`,
        }}
      >
        <div data-aos="fade-up" className="text-white text-center  pt-16">
          <p className="text-base font-bold">Check out these real reviews</p>
          <h2 className="md:mt-6 md:text-4xl text-3xl font-bold mt-4">
            Users-love-us Don't take it from us.
          </h2>
        </div>
      </div>
      <div data-aos="fade-up" className="!-mt-[50vh]">
        <Testimonial />
      </div>
    </div>
  );
}
