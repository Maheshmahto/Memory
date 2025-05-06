import React from 'react';

const Birthday: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">🎉 Coming Soon!</h1>
        <p className="text-gray-600">
          We're working on something special for birthdays. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Birthday;