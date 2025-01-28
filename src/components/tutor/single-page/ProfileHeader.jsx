import Image from "next/image";
import { Heart, Share2, MapPin, Star } from "lucide-react";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoHeartOutline } from "react-icons/io5";

const ProfileHeader = () => {
  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row  gap-8 mb-12">
        <div className=" relative w-full lg:w-fit flex gap-2">
          <Image
            width={256}
            height={256}
            src="/assets/tutor/Marlenereilly.jpg"
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
                Marlene Reilly
              </h2>
              <IoHeartOutline className=" cursor-pointer" />
            </div>
            <div className="flex   items-start sm:items-center gap-3">
              {/* Location */}
              <div className="flex items-center text-sm text-gray-500">
                <SlLocationPin className="mr-1" />
                United Kingdom
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
                  3.50
                </span>
                <span className="text-sm text-gray-500">(2)</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span>2 Learners</span>
              <span>3 Sessions</span>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="hidden  lg:flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold ">Marlene Reilly</h1>
            <Image
              width={24}
              height={24}
              src="https://flagcdn.com/eg.svg"
              alt="Egypt flag"
              className="w-6 h-4"
            />
          </div>
          <div className=" items-center gap-6 mb-4 hidden  lg:flex">
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
    </div>
  );
};

export default ProfileHeader;
