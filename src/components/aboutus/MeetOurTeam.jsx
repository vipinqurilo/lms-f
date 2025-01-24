import React from "react";

const MeetOurTeam = () => {
  // Array of team members
  const teamMembers = [
    {
      name: "Stephen Fleming",
      role: "CEO & Founder",
      image: "/images/1650349739-creativedirector364x3642.png",
    },
    {
      name: "Jane Doe",
      role: "Marketing Head",
      image: "/images/1650349739-creativedirector364x3642.png",
    },
    {
      name: "John Smith",
      role: "Tech Lead",
      image: "/images/1650349739-creativedirector364x3642.png",
    },
    {
      name: "Emily Johnson",
      role: "Design Lead",
      image: "/images/1650349739-creativedirector364x3642.png",
    },
    {
        name: "Emily Johnson",
        role: "Design Lead",
        image: "/images/1650349739-creativedirector364x3642.png",
      },

      {
        name: "Emily Johnson",
        role: "Design Lead",
        image: "/images/1650349739-creativedirector364x3642.png",
      },

  ];

  return (
    <div className="bg-white py-16 px-8">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row  items-center md:items-start justify-between gap-8  px-14">
        {/* Left Section */}
        <div className="text-left">
            <div>
            <p className="text-orange-500 text-sm font-semibold uppercase">People</p>

            </div>
          <div>
          <h1 className="text-[30px]  w-52   mt-2">
            Meet our team  of experts 
          </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-gray-600 max-w-2xl text-[21px] leading-9">
          <p>
            Our highly knowledgeable and experienced team members have a creative,
            collaborative, and committed nature which enables Platform to be a highly
            effective company.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-7 justify-items-center mt-16 p-9">
        {teamMembers.map((member, index) => (
         <div className="text-center   w-80 h-72 flex flex-col items-center justify-center hover:border border-gray-300" key={index}>
         {/* Image */}
         <div>
           <img
             src={member.image}
             alt={member.name}
             className="object-cover w-40 h-40 rounded-full"
           />
         </div>
         {/* Name */}
         <div>
           <h3 className="font-bold text-lg mt-4">{member.name}</h3>
           {/* Role */}
           <p className="text-gray-500">{member.role}</p>
         </div>
       </div>
       
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;





// import React from 'react';

// const Statistics = () => {
//   return (
//     <div className="flex justify-around bg-gray-100 p-10">
//       {/* Languages */}
//       <div className="flex flex-col items-center text-center bg-white p-6 rounded-full shadow-md">
//         <div className="bg-gray-200 rounded-full p-4 mb-4">
//           <img
//             src="/path-to-language-icon.png" // Replace with the actual icon path
//             alt="Languages Icon"
//             className="w-10 h-10"
//           />
//         </div>
//         <h2 className="text-2xl font-bold">130+</h2>
//         <p className="text-gray-600">Languages Available to Learn</p>
//       </div>

//       {/* Teachers */}
//       <div className="flex flex-col items-center text-center bg-white p-6 rounded-full shadow-md">
//         <div className="bg-gray-200 rounded-full p-4 mb-4">
//           <img
//             src="/path-to-teachers-icon.png" // Replace with the actual icon path
//             alt="Teachers Icon"
//             className="w-10 h-10"
//           />
//         </div>
//         <h2 className="text-2xl font-bold">10,000+</h2>
//         <p className="text-gray-600">Teachers From 120 Countries</p>
//       </div>

//       {/* Learners */}
//       <div className="flex flex-col items-center text-center bg-white p-6 rounded-full shadow-md">
//         <div className="bg-gray-200 rounded-full p-4 mb-4">
//           <img
//             src="/path-to-learners-icon.png" // Replace with the actual icon path
//             alt="Learners Icon"
//             className="w-10 h-10"
//           />
//         </div>
//         <h2 className="text-2xl font-bold">5,000,000+</h2>
//         <p className="text-gray-600">Learners From 180 Countries</p>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
