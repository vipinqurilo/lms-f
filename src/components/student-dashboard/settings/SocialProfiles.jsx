import { useState } from "react";

export function SocialProfiles() {
  const [profiles, setProfiles] = useState({
    website: "",
    github: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle social profiles update
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6  p-4 px-8">
      <div className="space-y-2">
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700"
        >
          Website
        </label>
        <input
          id="website"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profiles.website}
          onChange={(e) =>
            setProfiles({ ...profiles, website: e.target.value })
          }
          placeholder="https://"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="github"
          className="block text-sm font-medium text-gray-700"
        >
          Github
        </label>
        <input
          id="github"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profiles.github}
          onChange={(e) => setProfiles({ ...profiles, github: e.target.value })}
          placeholder="github.com/username"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-700"
        >
          Facebook
        </label>
        <input
          id="facebook"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profiles.facebook}
          onChange={(e) =>
            setProfiles({ ...profiles, facebook: e.target.value })
          }
          placeholder="facebook.com/username"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter
        </label>
        <input
          id="twitter"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profiles.twitter}
          onChange={(e) =>
            setProfiles({ ...profiles, twitter: e.target.value })
          }
          placeholder="twitter.com/username"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-gray-700"
        >
          Linkedin
        </label>
        <input
          id="linkedin"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profiles.linkedin}
          onChange={(e) =>
            setProfiles({ ...profiles, linkedin: e.target.value })
          }
          placeholder="linkedin.com/in/username"
        />
      </div>

      <button
        type="submit"
        className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Save Profile
      </button>
    </form>
  );
}
