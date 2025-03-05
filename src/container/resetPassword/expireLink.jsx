import React from 'react';

const ExpireLink = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-14">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-5/12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mt-12">Your link is expired</h2>
        <button className="w-full mt-6 bg-primary text-white p-3 rounded-md font-semibold hover:bg-black">
          OK
        </button>
      </div>
    </div>
  );
};

export default ExpireLink;
