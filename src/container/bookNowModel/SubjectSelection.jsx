import React from 'react';

const SubjectSelection = ({ bookingData, updateBookingData }) => {
  const handleChange = (e) => {
    updateBookingData({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select a Subject</h3>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={bookingData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium">
          Lesson Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={bookingData.duration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-accent focus:border-accent"
        />
      </div>
    </div>
  );
};

export default SubjectSelection;
