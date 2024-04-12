import React, { useState } from 'react';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="md:flex items-center mb-8">
        <div className="mr-4">
          <p className="text-3xl md:text-5xl font-bold text-green-500 mb-5">Explore Creative Classes</p>
          <p className='text-xl font-medium mb-3'>Choose from over 2000+ courses on topics like Java, DSA, Networking, and much more</p>
        </div>
        <div>
          <img src="https://venturesafrica.com/wp-content/uploads/2022/09/comms_4X.jpg" className="w-[500px] h-[272px] object-cover rounded-lg shadow-md" alt="Creative Classes" />
        </div>
      </div>
      <div className="mb-8 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-green-600 mb-3">Upgrade To Premium</p>
        <p className='text-xl font-medium'>Unlimited Questions, Chat Room, and much more</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`bg-white rounded-lg shadow-md p-6 text-center ${selectedPlan === '12' ? 'border-green-500 border-4 transition-all duration-300' : ''}`}>
          <p className="font-semibold rounded-full bg-green-600 text-2xl mt-0">SAVE 66%</p>
          <p className="text-4xl font-bold">12</p>
          <p className="text-gray-600">Months</p>
          <p className="text-gray-600">$6.00/mt</p>
          <button onClick={() => setSelectedPlan('12')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none">
            Select
          </button>
        </div>
        <div className={`bg-white rounded-lg shadow-md p-6 text-center ${selectedPlan === '3' ? 'border-green-500 border-4 transition-all duration-300' : ''}`}>
          <p className="font-semibold rounded-full bg-green-600 text-2xl">SAVE 66%</p>
          <p className="text-4xl font-bold">3</p>
          <p className="text-gray-600">Months</p>
          <p className="text-gray-600">$6.00/mt</p>
          <button onClick={() => setSelectedPlan('3')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none">
            Select
          </button>
        </div>
        <div className={`bg-white rounded-lg shadow-md p-6 text-center ${selectedPlan === '1' ? 'border-green-500 border-4 transition-all duration-300' : ''}`}>
          <p className="font-semibold rounded-full bg-green-600 text-2xl">SAVE 66%</p>
          <p className="text-4xl font-bold">1</p>
          <p className="text-gray-600">Month</p>
          <p className="text-gray-600">$6.00/mt</p>
          <button onClick={() => setSelectedPlan('1')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none">
            Select
          </button>
        </div>
      </div>
      <button className="bg-green-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex justify-center items-center mx-auto transition-all duration-300 focus:outline-none">
        {selectedPlan ? `Get ${selectedPlan} Month${selectedPlan > 1 ? 's' : ''} / $${selectedPlan * 6}.00` : 'Select a Plan'}
      </button>
    </div>
  );
};

export default Subscription;
