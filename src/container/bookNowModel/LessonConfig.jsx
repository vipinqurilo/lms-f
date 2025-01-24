import React from 'react';

const LessonConfig = ({ bookingData, updateBookingData }) => {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    updateBookingData({ [name]: newValue });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Configure Your Lesson</h3>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isOffline"
            checked={bookingData.isOffline}
            onChange={handleChange}
            className="mr-2"
          />
          Offline Lesson
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="lessonCount" className="block text-sm font-medium">
          Number of Lessons
        </label>
        <input
          type="number"
          id="lessonCount"
          name="lessonCount"
          value={bookingData.lessonCount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent focus:border-accent"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isRecurring"
            checked={bookingData.isRecurring}
            onChange={handleChange}
            className="mr-2"
          />
          Recurring Lessons
        </label>
      </div>
    </div>
  );
};

export default LessonConfig;
