import React from "react";
const certificationData = [
  {
    period: "2012 - 2012",
    title: "Certificate of English Teaching to Learner",
    institution: "University of Padua",
    location: "Padua, Italy",
  },
  {
    period: "2012 - 2012",
    title: "OTC (Online Teaching Certifictae)",
    institution: "Sapienza University of Rome",
    location: "Rome",
  },
];
const educationData = [
  {
    period: "2006 - 2008",
    degree: "BA English",
    university: "University of Padua",
    location: "Padua, Italy",
  },
  {
    period: "2008 - 2010",
    degree: "MA",
    university: "University of Padua",
    location: "Padua, Italy",
  },
  {
    period: "2011 - 2011",
    degree: "B.ed",
    university: "University of Padua",
    location: "Padua, Italy",
  },
];
const TeachingQualificationsSection = () => {
  return (
    <div>
      {/* Teaching Qualifications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Teaching qualifications</h2>
        <div className="space-y-8">
          <div className="flex justify-start items-start">
            <h3 className="text-xl font-semibold mb-4 w-1/3">Education</h3>
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div key={index} className="flex gap-8 h-fit">
                  <div className="w-32 text-gray-600">{edu.period}</div>
                  <div className="w-[2px] bg-gray-300 h-[90px] relative">
                    <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-0 left-[50%] -translate-x-[50%]"></div>
                  </div>
                  <div>
                    <div className="font-medium">{edu.degree}</div>
                    <div>{edu.university}</div>
                    <div className="text-gray-600">{edu.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-start items-start">
            <h3 className="text-xl font-semibold mb-4 w-1/3">Certification</h3>
            <div className="space-y-6">
              {certificationData.map((cert, index) => (
                <div key={index} className="flex gap-8">
                  <div className="w-32 text-gray-600">{cert.period}</div>
                  <div className="w-[2px] bg-gray-300 h-[90px] relative">
                    <div className="absolute w-2 h-2 bg-gray-300 rounded-full top-0 left-[50%] -translate-x-[50%]"></div>
                  </div>
                  <div>
                    <div className="font-medium">{cert.title}</div>
                    <div>{cert.institution}</div>
                    <div className="text-gray-600">{cert.location}</div>
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

export default TeachingQualificationsSection;
