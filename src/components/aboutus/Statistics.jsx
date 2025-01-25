import React from 'react';

const statisticsData = [
  {
    id: 1,
    icon: '/images/1650351210-translater.png',
    value: '130 +',
    description: 'Languages Available to Learn',
  },
  {
    id: 2,
    icon: '/images/1650351215-teacher.png',
    value: '100 +',
    description: 'Experienced Teachers Worldwide',
  },
  {
    id: 3,
    icon: '/images/1650351220-learner.png',
    value: '5,000,000+ ',
    description: 'Active Learners Globally',
  },
];

const Statistics = () => {
  return (
    <div className="flex justify-around items-center h-[440px] bg-gray-100 p-10">
      {statisticsData.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col items-center text-center bg-white p-6 w-44 h-44 rounded-full shadow-md relative"
        >
          <div className="absolute top-1/2 transform -translate-y-1/2">
            <img
              src={stat.icon}
              alt={`${stat.description} Icon`}
              className="w-11 h-11"
            />
          </div>
          <div className="mt-44">
            <h2 className="text-2xl font-semibold">{stat.value}</h2>
            <p className="text-gray-600 w-80">{stat.description}</p>
          </div>
          <div className='mt-16'>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
