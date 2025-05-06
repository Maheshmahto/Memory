import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-gray-100 text-center text-2xl text-gray-600">
      <div className="flex justify-center items-center space-x-1">
        <h1 className=''>Made with</h1>
        <Heart size={30} className="text-red-500 fill-red-500" />
        <h1>by Mahesh Mahto</h1>
      </div>
    </footer>
  );
};

export default Footer;
