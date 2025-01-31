import React from "react";
import Loader from "./Loader";

const CommonButton = ({
  label,
  onClick,
  variant = "primary",
  loading = false,
}) => {
  const baseStyles =
    "px-4 h-fit py-2 rounded-md shadow text-sm font-semibold transition";

  const styles = {
    primary: `bg-background text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-95`,
    secondary: `border border-backbg-background text-[#223142] hover:bg-[#223142] hover:text-white`,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${styles[variant]}`}
    >
      {loading ? <Loader color={"text-white"} /> : label}
    </button>
  );
};

export default CommonButton;
