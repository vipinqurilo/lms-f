import React from "react";

export default function UnlimitedAccess() {
  const data = {
    stats: [
      {
        id: 1,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-07.svg",
        number: "147",
        desc: "students enrolled",
      },
      {
        id: 2,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-08.svg",
        number: "78",
        desc: "total courses",
      },
      {
        id: 1,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-09.svg",
        number: "14",
        desc: "countries",
      },
    ],
    heading: `Unlimited access to 360+ courses
and 1,600+ hands-on labs`,
    logos: [
      "https://dreamslms.dreamstechnologies.com/html/index.html",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-10.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-16.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-12.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-13.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-14.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-15.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-16.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-17.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-18.svg",
    ],
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-blue-50 py-10 px-5">
      {/* Statistics Section */}
      <div className="md:px-20 px-4">
        <div className="flex md:flex-row flex-col md:justify-evenly py-2 bg-gradient-to-r from-blue-300 rounded-2xl to-blue-100 mb-10">
          {data.stats.map((state) => (
            <div
              key={state.desc} // Add a unique key for React list rendering
              className="flex items-center space-x-4 p-5 rounded-lg text-left "
            >
              <div className="bg-white md:p-3  p-1 rounded-md">
                {/* Icon */}
                <div className="  font-bold text-orange-500">
                  <img src={state.img} alt={state.desc} />
                </div>
              </div>
              <div>
                <p className="md:text-3xl text-2xl font-extrabold text-[#002058]">
                  {state.number}
                </p>
                <p className="md:text-xl text-base font-medium text-black md:mt-6 uppercase bold">
                  {state.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Information Section */}
      <div className="text-center mb-10 md:mt-16 mt-4">
        <p className="md:text-4xl text-2xl leading-10 font-bold text-gray-900">
          Unlimited access to <span className="">360+ courses</span> <br />
          and <span className="">1,600+ hands-on labs</span>
        </p>
      </div>

      {/* Icons Section */}
      <div className="flex justify-center flex-wrap gap-6">
        {/* Replace these spans with actual icons */}
        {data.logos.map((logo) => (
          <span className="bg-white p-4 rounded ">
            <img src={logo} alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}
