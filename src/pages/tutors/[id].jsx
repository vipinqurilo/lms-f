"use client";

import { useState } from "react";
import { Heart, Share2, MapPin, Star } from "lucide-react";
import Image from "next/image";

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

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("newest");

  return (
    <div className="flex px-10 py-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-64 h-64 relative">
            <Image
              width={256}
              height={256}
              src="/assets/tutor/Marlenereilly.jpg"
              alt="Tutor"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold">Jarod Dach</h1>
              <img
                src="https://flagcdn.com/eg.svg"
                alt="Egypt flag"
                className="w-6 h-4"
              />
            </div>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FF9800]" />
                <span>4.00</span>
                <span className="text-gray-500">1 Review(s)</span>
              </div>
              <div className="flex items-center gap-6">
                <span>2 Learners</span>
                <span>3 Sessions</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-2">
                Pricing ${36.0} - ${72.0}
              </div>
              <div>Teaches: Genres</div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Heart className="w-4 h-4" />
                Favorite
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About Ariel Bednar</h2>
          <p className="text-gray-700">
            I'm a self-starter with a lot of enthusiasm who can work quickly and
            efficiently. I began teaching English in 2014 and am continuously
            learning more about this profile. I make learning enjoyable for
            students by allowing them to talk freely, make errors, and learn at
            their own speed and style.
          </p>
        </section>

        {/* Speaks Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Speaks</h2>
          <div className="space-y-2">
            <div>English(Beginner)</div>
            <div>Italian(Advanced)</div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Pricing</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between font-medium mb-4">
              <div>Teaching subjects</div>
              <div>Slot price</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Genres</div>
              <div className="flex items-center gap-4">
                <div>$97.50</div>
                <select className="border rounded px-2 py-1">
                  <option>30</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        {/* Group Classes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Group classes</h2>
          <div className="border rounded-lg overflow-hidden max-w-[400px]">
            <div className="relative">
              <Image
                width={192}
                height={192}
                src="/assets/tutor/Marlenereilly.jpg"
                alt="classes"
                className=" object-cover h-[192px] w-full"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                4 Classes
              </div>
            </div>
            <div className="p-6">
              <div className="text-[#FF9800] font-medium mb-2">LITERATURE</div>
              <h3 className="text-xl font-bold mb-4">
                General Biology: The World of the Cell
              </h3>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div>Mar 06, 2025</div>
                <div>00:15 Onwards</div>
                <div>46 Seats</div>
              </div>
              <div className="text-2xl font-bold mb-6">$151.00</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src="/assets/tutor/Marlenereilly.jpg"
                    alt="classes"
                    className=" object-cover rounded-lg"
                  />

                  <div>
                    <div className="font-medium">Ariel Bednar</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#FF9800]" />
                      <span>4.00</span>
                      <span className="text-gray-500">(1)</span>
                    </div>
                  </div>
                </div>
                <button className="ml-auto px-6 py-2 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00] transition-colors">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Teaching Expertise */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Teaching expertise</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Accents</h3>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                  British English
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Teaches level</h3>
              <div className="flex gap-4 flex-wrap">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                  (A2) Upper Beginner
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                  (C1) Advanced
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Lessons include</h3>
              <div className="flex gap-4 flex-wrap">
                {["Curriculum", "Learning Materials", "Lesson Plans"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Test preparations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "AP",
                  "APTIS",
                  "CAE",
                  "ESOL",
                  "FCE",
                  "GCSE",
                  "GMAT",
                  "IELTS",
                  "OET",
                  "OPI",
                  "PET",
                  "SAT",
                ].map((test, index) => (
                  <span key={index} className="inline-flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                    {test}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Learner ages</h3>
              <div className="flex gap-4">
                {["12 Years to 18 Years", "18+ Years"].map((age, index) => (
                  <span key={index} className="inline-flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FF9800] rounded-full"></span>
                    {age}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Teaching Qualifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Teaching qualifications</h2>
          <div className="space-y-8">
            <div className="flex justify-start items-start">
              <h3 className="text-xl font-semibold mb-4 w-1/3">Education</h3>
              <div className="space-y-6">
                {educationData.map((edu, index) => (
                  <div key={index} className="flex gap-8">
                    <div className="w-32 text-gray-600">{edu.period}</div>
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
              <h3 className="text-xl font-semibold mb-4 w-1/3">
                Certification
              </h3>
              <div className="space-y-6">
                {certificationData.map((cert, index) => (
                  <div key={index} className="flex gap-8">
                    <div className="w-32 text-gray-600">{cert.period}</div>
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
        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Review</h2>
          <div className="flex items-baseline gap-4 mb-8">
            <div className="text-5xl font-bold">4.00</div>
            <div className="text-gray-600">Overall ratings</div>
          </div>
          <div className="flex justify-end mb-6">
            <select
              className="border rounded-lg px-4 py-2"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="newest">Sort by newest</option>
              <option value="oldest">Sort by oldest</option>
            </select>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Image
                width={40}
                height={40}
                src="/assets/tutor/Marlenereilly.jpg"
                alt="classes"
                className=" object-cover rounded-lg h-[47px] w-[47px]"
              />
              <div>
                <div className="font-medium">Jarod Dach</div>
                <div className="text-gray-600 text-sm">Oct 05, 2024 07:14</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="font-medium">Really liked the Session</div>
                  <div className="text-[#FF9800]">4</div>
                </div>
                <p className="mt-2">Really liked the Session</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="min-w-[400px] max-w-[400px] h-fit space-y-4  border  shadow rounded-lg p-12">
        <button className="w-full py-3 bg-[#FF9800] text-white rounded-lg hover:bg-[#F57C00] transition-colors">
          Book now
        </button>
        <button className="w-full py-3 border border-[#FF9800] text-[#FF9800] rounded-lg hover:bg-orange-50 transition-colors">
          Contact
        </button>
        <a
          href="#"
          className="block text-center text-[#FF9800] hover:underline"
        >
          View full availability
        </a>
        <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Book free trial
        </button>
        <div className="text-center text-sm text-gray-600">
          Trial lesson one time
        </div>
      </div>
    </div>
  );
}
