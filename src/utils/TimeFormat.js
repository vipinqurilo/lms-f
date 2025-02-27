export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00:00";

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return [hours, minutes, secs]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};
