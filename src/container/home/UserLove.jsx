import React from "react";
import Testimonial from "@/components/common/Testimonial";
import Heading from "@/components/common/Heading";

export default function UserLove() {
  return (
    <div>
      <div
        data-aos="fade-up"
        className=" bg-cover  w-full relative custom-container bg-gradient-to-r from-primary/5 via-secondary/5 to-secondary/10 flex flex-col gap-10"
        // style={{
        //   backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/user-love.jpg')`,
        // }}
      >
        <Heading
          heading={"What Our Customers Say"}
          desc={
            "Discover how our services have made a difference. See what our happy customers have to say about their experience with us."
          }
          position={"lg:w-[60%]"}
        />

        <div className="w-full">
          <Testimonial />
        </div>
      </div>
    </div>
  );
}
