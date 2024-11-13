import React from 'react';

const RedLines: React.FC = () => {
  return (
    <div className=''>
      {/* Vertical Line */}
      <div className="fixed top-0 left-1/2 w-[2px] h-full bg-red-500 z-50"></div>

      {/* Horizontal Line */}
      <div className="fixed top-1/2 left-0 w-full h-[2px] bg-red-500 z-50"></div>
    </div>
  );
};

export default RedLines;
