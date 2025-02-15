import Image from "next/image";
import { Heart, Share2, MapPin, Star } from "lucide-react";
import React, { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoHeartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Rating from "@/container/tutorCard/Rating";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const icons = [
  {
    id: 1,
    Icon: FaInstagram,
    link: "https://instagram.com",
    color: "bg-[#E1306C]",
  },
  {
    id: 2,
    Icon: FaLinkedinIn,
    link: "https://linkedin.com",
    color: "bg-[#0077B5]",
  },
  {
    id: 3,
    Icon: FaXTwitter,
    link: "https://twitter.com",
    color: "bg-[#1DA1F2]",
  },
  {
    id: 4,
    Icon: FaFacebookF,
    link: "https://facebook.com",
    color: "bg-[#1877F2]",
  },
];
const ProfileHeader = () => {
  // Get tutor profile from Redux store
  const { tutorProfile } = useSelector((state) => state.tutors);
  console.log(tutorProfile, "tutorProfile");

  // State to manage visibility of share icons
  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="relative w-full lg:w-fit flex gap-2">
          <Image
            width={256}
            height={256}
            src={
              tutorProfile?.user?.profilePhoto ||
              "/assets/tutor/Marlenereilly.jpg"
            } // Use profile image dynamically
            alt="Tutor"
            className="rounded-xl object-cover w-[80px] lg:w-[256px] h-[80px] lg:h-[256px]"
          />
          <div className="px-2 w-full flex flex-col gap-2 lg:hidden ">
            <div className="flex justify-between items-center">
              <h2
                data-tip={"Tip Here"}
                data-for={"mytip"}
                className="text-base font-bold cursor-pointer"
              >
                {tutorProfile?.user?.firstName} {tutorProfile?.user?.lastName}
              </h2>
              <IoHeartOutline className="cursor-pointer" />
            </div>
            <div className="flex items-start sm:items-center gap-3">
              {/* Location */}
              <div className="flex items-center text-sm text-gray-500">
                <SlLocationPin className="mr-1" />
                {tutorProfile?.user?.country || "United Kingdom"}{" "}
                {/* Dynamic location */}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <span className="flex items-center gap-1 text-sm font-semibold text-dark_text">
                  <Image
                    width={16}
                    height={16}
                    src={"/assets/icons/star-fill.svg"}
                    alt="Star"
                  />
                  {tutorProfile?.rating || 3.5} {/* Dynamic rating */}
                </span>
                <span className="text-sm text-gray-500">
                  ({tutorProfile?.reviewsCount || 0}){" "}
                  {/* Dynamic review count */}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span>{tutorProfile?.learnersCount || 0} Learners</span>
              <span>{tutorProfile?.sessionsCount || 0} Sessions</span>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="hidden lg:flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold">
              {tutorProfile?.user?.firstName} {tutorProfile?.user?.lastName}
            </h1>
          </div>
          <div className="items-center gap-6 mb-4 hidden lg:flex">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {tutorProfile?.user?.country || "Unknown Country"}
              </span>{" "}
              {/* Dynamic location */}
            </div>
            {tutorProfile?.rating && (
              <Rating
                rating={tutorProfile?.rating}
                reviews={tutorProfile?.reviewsCount}
              />
            )}
            <div className="flex items-center gap-6">
              <span>{tutorProfile?.learnersCount || 0} Learners</span>
              <span>{tutorProfile?.sessionsCount || 0} Sessions</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2">
              Pricing ${tutorProfile?.minPrice || 36.0} - $
              {tutorProfile?.maxPrice || 72.0}
            </div>
            <div>
              Teaches: &nbsp;
              {tutorProfile?.subjectsTaught
                ?.map((subject) => subject.name)
                .join(", ")}
            </div>{" "}
          </div>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setShowShareIcons(!showShareIcons)} // Toggle visibility
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            {showShareIcons && ( // Conditionally render share icons
              <div
                className="flex justify-center items-center gap-2"
                data-aos="fade-right"
              >
                {icons.map(({ id, link, Icon, color }) => (
                  <div
                    key={id}
                    className={`w-8 h-8  flex items-center justify-center rounded-full ${color} hover:border hover:border-black/10 transition-custom`}
                  >
                    <Link href={link}>
                      <Icon className={`text-[18px] text-white `} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
