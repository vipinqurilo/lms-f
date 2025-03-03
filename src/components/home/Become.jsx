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

      <div className="relative md:w-[80%] w-1/2">
        <Image
          src={imgSrc}
          alt={title}
          width={150}
          height={150}
          layout="responsive"
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
        link="/teach-on-steam"
        linkText="Join Us"
        imgSrc="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-02.svg"
        bgColor="#ffdeda"
      />

      <BecomeCard
        title="Transform Access To Education"
        description="Create an account to receive our newsletter, course recommendations and promotions."
        link="/register"
        linkText="Register Now"
        imgSrc="https://dreamslms.dreamstechnologies.com/html/assets/img/icon/become-01.svg"
        bgColor="#ffe88f"
      />
    </div>
  );
}
