import React from 'react';

const DisplayImage = ({ imgeUrl, onClose }) => {
  return (
    <div className='flex justify-center p-4'>
      <div className='relative'>
        <button className='absolute top-0 right-0 p-2 text-white' onClick={onClose}>
          <span className='text-xl'>&times;</span>
        </button>
        <img alt='' src={imgeUrl} className='h-full w-80' />
      </div>
    </div>
  );
};

export default DisplayImage;
