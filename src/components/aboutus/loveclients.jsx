import React from "react";

const MissionVision = () => {
  // Define data for cards
  const cards = [
    {
      title: "Our Mission",
      image: "/images/1650025272-mission.png",
      description:
        "Our mission is to help entrepreneurs and tutors set up their own online tutoring platforms like Verbling, Preply, and Cambly. We help them reach the pinnacle of their career by enabling them to launch their own tutoring platform using our readymade solution.",
    },
    {
      title: "Our Inspiration & Vision",
      image: "/images/1650025364-vision.png",
      description:
        "Our mission is to help entrepreneurs and tutors set up their own online tutoring platforms like Verbling, Preply, and Cambly. We help them reach the pinnacle of their career by enabling them to launch their own tutoring platform using our readymade solution.",
    },
    {
      title: "Our Goal",
      image: "/images/1650025272-mission.png",
      description:
        "Our mission is to help entrepreneurs and tutors set up their own online tutoring platforms like Verbling, Preply, and Cambly. We help them reach the pinnacle of their career by enabling them to launch their own tutoring platform using our readymade solution.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6 lg:px-24 flex flex-col lg:flex-row items-center lg:items-start">
      {/* Left Section */}
      <div className="lg:w-1/3 mb-8 lg:mb-0 lg:mr-12 text-center lg:text-left mt-9">
        <h2 className="text-[#F79F0C] text-base font-bold uppercase">
          Our Mission & Vision
        </h2>
        <div className="  ">
        <p className="text-[30px]  mt-2  leading-14">
          Get to know about our mission and vision
        </p>
        </div>
        <button className="  px-9 py-2 bg-orange-500 text-white rounded-lg mt-20 hover:bg-orange-600">
          Contact Us
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3   md:grid-cols-2 lg:grid-cols-2 gap-6  px-12">
        {cards.map((card, index) => (
          <div key={index} className="p-6">
            <div className="flex items-center">
              <div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-black">
                  {card.title}
                </h3>
              </div>
            </div>
            <div className="leading-9">
              <p className="text-gray-600 mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
