import { updateSocialProfilesAsync } from "@/store/slices/student-dashboard/ProfileSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SocialProfiles() {
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector(
    (state) => state.student.profile
  );

  const [profiles, setProfiles] = useState({
    website: "",
    github: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (profile?.socialLinks) {
      const updatedProfiles = profile.socialLinks.reduce((acc, link) => {
        acc[link.name] = link.url;
        return acc;
      }, {});
      setProfiles((prev) => ({ ...prev, ...updatedProfiles }));
    }
  }, [profile]);

  // Watch for error changes from Redux and set local error
  useEffect(() => {
    if (error?.fetchSocialProfilesAsync || error?.updateSocialProfilesAsync) {
      setLocalError(
        error.fetchSocialProfilesAsync || error.updateSocialProfilesAsync
      );

      // Clear the error after 4 seconds
      const timer = setTimeout(() => {
        setLocalError("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfiles = Object.keys(profiles).map((key) => ({
      name: key,
      url: profiles[key],
    }));
    dispatch(updateSocialProfilesAsync(updatedProfiles));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 px-8">
      {localError && <p className="text-red-500">{localError}</p>}

      {Object.keys(profiles).map((key) => (
        <div className="space-y-2" key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            id={key}
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profiles[key]}
            onChange={(e) =>
              setProfiles({ ...profiles, [key]: e.target.value })
            }
            placeholder={`${key}.com/username`}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading["updateSocialProfilesAsync"]}
        className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {isLoading["updateSocialProfilesAsync"] ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
