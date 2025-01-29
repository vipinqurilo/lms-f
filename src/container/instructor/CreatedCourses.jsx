import React from "react";

const headingsData = ["Courses", "Enrolled", "Status"];

const data = [
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-01.jpg",
    name: "Full-Stack Web Development",
    link: "/courses/full-stack-web-development",
    enrolled: "1200 Students",
    status: "Published",
  },
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-02.jpg",
    name: "UI/UX Design Fundamentals",
    link: "/courses/ui-ux-design",
    enrolled: "850 Students",
    status: "Published",
  },
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-03.jpg",
    name: "Digital Marketing Masterclass",
    link: "/courses/digital-marketing",
    enrolled: "940 Students",
    status: "Published",
  },
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-04.jpg",
    name: "Python for Data Science",
    link: "/courses/python-data-science",
    enrolled: "1100 Students",
    status: "Published",
  },
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-05.jpg",
    name: "Business Analytics with Excel",
    link: "/courses/business-analytics",
    enrolled: "730 Students",
    status: "Published",
  },
  {
    img: "https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-06.jpg",
    name: "Cybersecurity Essentials",
    link: "/courses/cybersecurity",
    enrolled: "670 Students",
    status: "Published",
  },
];

const CreatedCourses = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-dark mb-6">
        Recently Created Courses
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hiddenp-4 ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {headingsData?.map((heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left font-semibold text-background"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 w-[60%]">
                    <button className="text-light/60 hover:text-primary">
                      {course?.name}
                    </button>
                  </td>
                  <td key={index} className="px-6 py-4">
                    <button className="text-light/60 hover:text-primary">
                      {course?.enrolled}
                    </button>
                  </td>
                  <td key={index} className="px-6 py-4">
                    <button className="text-light/60 hover:text-primary">
                      {course?.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatedCourses;
