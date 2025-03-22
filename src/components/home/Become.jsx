import React from "react";
import Image from "next/image";
import NavigationLink from "./NavigationLink";

const BecomeCard = ({
  title,
  description,
  link,
  linkText,
  imgSrc,
  bgColor,
}) => {
  return (
    <div
      className={`rounded-2xl flex items-center justify-center md:flex-row flex-col px-4 lg:px-6 py-4`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="py-8 flex flex-col gap-4">
        <h2 className="md:text-2xl text-[20px] font-extrabold text-[#002058]">
          {title}
        </h2>
        <p className="md:text-[18px] text-base md:w-full">{description}</p>
        <NavigationLink path={link} text={linkText} />
      </div>

      <div className="relative md:w-[80%] w-1/2 h-full">
        <Image
          src={imgSrc}
          alt={title}
          // width={150}
          // height={150}
          layout="fill"
        />
      </div>
    </div>
  );
};

export default function Become() {
  return (
    <div
      data-aos="fade-up"
      className="flex gap-4 custom-container lg:flex-row flex-col lg:gap-10"
    >
      <BecomeCard
        title="Join as an Instructor"
        description="Top instructors from around the world teach millions of students on Mentoring."
        link="/teach-on-STEAM"
        linkText="Join Us"
        imgSrc="/assets/home/instructor.png"
        bgColor="#ffdeda"
      />

      <BecomeCard
        title="Transform Access To Education"
        description="Create an account to receive our newsletter, course recommendations and promotions."
        link="/register"
        linkText="Register Now"
        imgSrc="/assets/home/transform.png"
        bgColor="#ffe88f"
      />
    </div>
  );
}
