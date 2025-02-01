import React, { useState } from "react";
import { EditProfile } from "../student-dashboard/settings/EditProfile";
import { AvatarUpload } from "../student-dashboard/settings/AvatarUpload";
import { usePathname } from "next/navigation";

const BasicDetailsForm = () => {
  const path = usePathname();
  const [avatarUrl, setAvatarUrl] = useState("/assets/tutor/Marlenereilly.jpg");

  const handleAvatarUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleAvatarDelete = () => {
    setAvatarUrl("/placeholder.svg");
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {path !== "/instructor-request" && (
          <AvatarUpload
            avatarUrl={avatarUrl}
            onUpload={handleAvatarUpload}
            onDelete={handleAvatarDelete}
          />
        )}
        <EditProfile />
      </div>
    </div>
  );
};

export default BasicDetailsForm;
