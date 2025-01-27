import Image from "next/image";
import { Heart, Share2, MapPin, Star } from "lucide-react";
import React from "react";

const ProfileHeader = () => {
  return (
    <div>
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
            <Image
              width={24}
              height={24}
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
    </div>
  );
};

export default ProfileHeader;
