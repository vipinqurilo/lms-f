import React from "react";
import { useSelector } from "react-redux";

const ExperienceSection = () => {
  // Get tutor profile from Redux store
  const { tutorProfile } = useSelector((state) => state.tutors);

  // If tutorProfile is not loaded yet, return a loading message or placeholder
  if (!tutorProfile || !tutorProfile.experience) {
    return <div>Loading experience...</div>;
  }

  return (
    <div>
      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-start items-start">
            <h3 className="text-xl font-semibold mb-4 w-1/3">Professional Experience</h3>
            <div className="space-y-6">
              {tutorProfile.experience.map((exp) => (
                <div key={exp._id} className="flex gap-8 h-fit">
                  <div className="w-32 text-gray-600">
                    {/* Displaying the years (or "Ongoing" if no end date) */}
                    {new Date(exp.startDate).getFullYear()} - 
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : "Ongoing"}
                  </div>
                  <div className="w-[2px] bg-gray-300 h-[90px] relative">
                    <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-0 left-[50%] -translate-x-[50%]"></div>
                  </div>
                  <div>
                    <div className="font-medium">{exp.title}</div>
                    {/* Conditionally rendering institute if available */}
                    {exp.institute && <div>{exp.institute}</div>}
                    <div className="text-gray-600">{exp.location}</div>
                    <a href={exp.certificate} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                    {/* Displaying description if available */}
                    {exp.description && <p className="text-gray-500 mt-2">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TeachingQualificationsSection = () => {
  const { tutorProfile } = useSelector((state) => state.tutors);

  // If tutorProfile is not loaded yet, return a loading message or placeholder
  if (!tutorProfile || !tutorProfile.experience) {
    return <div>Loading qualifications...</div>;
  }

  return (
    <div>
      {/* Teaching Qualifications */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Teaching qualifications</h2>
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-start items-start">
            <h3 className="text-xl font-semibold mb-4 w-1/3">Education</h3>
            <div className="space-y-6">
              {tutorProfile.experience.map((exp) => (
                <div key={exp._id} className="flex gap-8 h-fit">
                  <div className="w-32 text-gray-600">
                    {/* Displaying the years (or "Ongoing" if no end date) */}
                    {new Date(exp.startDate).getFullYear()} - 
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : "Ongoing"}
                  </div>
                  <div className="w-[2px] bg-gray-300 h-[90px] relative">
                    <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-0 left-[50%] -translate-x-[50%]"></div>
                  </div>
                  <div>
                    <div className="font-medium">{exp.title}</div>
                    {/* Conditionally rendering institute if available */}
                    {exp.institute && <div>{exp.institute}</div>}
                    <div className="text-gray-600">{exp.location}</div>
                    <a href={exp.certificate} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                    {/* Displaying description if available */}
                    {exp.description && <p className="text-gray-500 mt-2">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { TeachingQualificationsSection, ExperienceSection };
