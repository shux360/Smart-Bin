import React from 'react';
import { Trees } from 'lucide-react';

const Logo = () => {
  
  return (
    <div className='flex hover:text-orange-600'>
        <Trees size={30} className='h-8 w-8' />
        <h1 className='text-lg font-medium px-1 mt-0.5'>SmartBin</h1>
      </div>
  );
};

export default Logo;