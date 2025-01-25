import FeaturedCard from "@/components/FeaturedCard";
import InstructorCard from "@/components/home/InstructorCard";
import React from "react";

export default function FeaturedInstructor() {
  const data = {
    heading: "Featured Instructor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.",
    cardData: [
      {
        id: 1,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/user/user9.jpg`,
        name: "Skyler Whites",
        designation: "UI Designer",
        numOfStudents: "50",
      },
      {
        id: 2,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/user/user10.jpg`,
        name: "Walter White",
        designation: "Web Developer",
        numOfStudents: "75",
      },
      {
        id: 3,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/user/user7.jpg`,
        name: "Jesse Pinkman",
        designation: "Backend Engineer",
        numOfStudents: "60",
      },
      {
        id: 4,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/user/user8.jpg`,
        name: "Hank Schrader",
        designation: "Project Manager",
        numOfStudents: "80",
      },
    ],
  };

  return (
    <div
      className="bg-no-repeat"
      style={{
        backgroundImage:
          "url(`https://dreamslms.dreamstechnologies.com/html/assets/img/bg-banner.png`)",
      }}
    >
      <div>
        <h2 className="text-4xl font-bold text-center">{data.heading}</h2>
        <p className="mt-4  font-semibold text-gray-500 text-center ">
          {data.desc}
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 md:mt-8 md:mx-20 mx-4">
        {data.cardData.map((item) => (
          <InstructorCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
