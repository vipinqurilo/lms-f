import React from "react";
import Testimonial from "@/components/home/Testimonial";

export default function UserLove() {
  return (
    <div>
      <div
        className=" bg-cover h-[80vh] w-full relative"
        style={{
          backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/user-love.jpg')`,
        }}
      >
        <div className="text-white text-center  md:pt-16">
          <p className="text-base font-bold">Check out these real reviews</p>
          <h2 className="md:mt-6 text-4xl font-bold">
            Users-love-us Don't take it from us.
          </h2>
        </div>
      </div>
      <div className="!-mt-[50vh]">
        <Testimonial />
      </div>
    </div>
  );
}
