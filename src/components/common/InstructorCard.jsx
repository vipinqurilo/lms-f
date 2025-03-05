import React from "react";
import Image from "next/image";
import { MdPeopleAlt, MdOutlineMenuBook, MdLanguage } from "react-icons/md";

export default function InstructorCard({ data }) {
  return (
    <div className="relative flex flex-col rounded-xl bg-white shadow-md overflow-hidden">
      {/* Image Container with Background */}
      <div className="relative flex items-center justify-center h-60 bg-gray-200">
        <Image
          src={data?.user?.profilePhoto || "/default-profile.png"}
          alt="profile-picture"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 text-center">
        <h4 className="mb-1 text-2xl font-semibold text-blue-gray-900">
          {data?.user?.firstName} {data?.user?.lastName}
        </h4>
        <p className="text-sm text-gray-600">{data?.user?.country}</p>

        <div className="space-y-3 mt-3">
          {/* Subjects Taught */}
          {data?.subjectsTaught?.length > 0 && (
            <div className="flex items-start gap-2 text-gray-700">
              <p className="text-xl">📖</p>
              <div className="flex items-center gap-2 flex-wrap">
                {data?.subjectsTaught?.slice(0, 2).map((subject) => (
                  <p
                  key={subject?._id}
                  className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-md"
                  >
                    {subject?.name} (${subject?.pricePerHour}/hr)
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Languages Spoken */}
          {data?.languagesSpoken?.length > 0 && (
            <div className="flex items-start gap-2 text-gray-700">
              <p className="text-xl">🗣️</p>
              <div className="flex items-center gap-2 flex-wrap">
                {data?.languagesSpoken?.map((language) => (
                  <p
                    key={language?._id}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-md"
                  >
                    {language?.name}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-x-2 text-gray-700">
            {/* <MdPeopleAlt className="text-xl" /> */}
            <p className="text-xl">🌍</p>
            {data?.tutionSlots?.map((slot) => (
              <p key={slot} className="text-sm font-medium">
                {slot} Min
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
