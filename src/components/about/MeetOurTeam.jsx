import React from "react";

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "PROF. Percy Sepeng",
      role: "Mathematics Education",
      image: "/assets/about/founder1.jpg",
    },
    {
      name: "PROF. Dikeledi Mahlo",
      role: "Inclusive Education",
      image: "/assets/about/founder2.jpg",
    },
    {
      name: "Associate PROF. Mmushetji Rankhumise",
      role: "Science Education",
      image: "/assets/about/founder3.jpg",
    },
    {
      name: "DR. Mogalatjane Matabane",
      role: "Mathematics Education",
      image: "/assets/about/founder1.jpg",
    },
    {
      name: "MS. Tshepiso Machekane",
      role: "Mathematics & Technology Education",
      image: "/assets/about/founder1.jpg",
    },

    {
      name: "MS. Lebogang Molope",
      role: "Social Worker",
      image: "/assets/about/founder2.jpg",
    },
  ];

  return (
    <div className="custom-container bg-white">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row  items-center md:items-start justify-between gap-8 ">
        {/* Left Section */}
        <div className="text-left">
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase">
              People
            </p>
          </div>
          <div>
            <h1 className="text-[30px] lg:w-52   mt-2">
              Meet our team of experts
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-gray-600 max-w-2xl text-[21px] leading-9">
          <p>
            Our highly knowledgeable and experienced team members have a
            creative, collaborative, and committed nature which enables Platform
            to be a highly effective company.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-7 justify-items-center mt-16">
        {teamMembers.map((member, index) => (
          <div
            className="text-center w-full h-72 flex flex-col items-center justify-center hover:border border-black/10 transition-custom hover:bg-black hover:text-white hover:drop-shadow rounded-lg group"
            key={index}
          >
            {/* Image */}
            <div>
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-40 h-40 rounded-full border-2 border-black/10"
              />
            </div>
            {/* Name */}
            <div>
              <h3 className="font-bold text-lg mt-4">{member.name}</h3>
              {/* Role */}
              <p className="text-light group-hover:text-white">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;
