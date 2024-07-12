import React, { useState, useEffect } from 'react';
import slider1 from '../image/slider (1).png';
import slider2 from '../image/slider (2).png';
import slider3 from '../image/slider (3).png';
import slider4 from '../image/slider (4).png';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const SlidingProduct = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const displayImages = [
    slider1,
    slider2,
    slider3,
    slider4,
  ];
  const delay = 3000;

  const nextImage = () => {
    if (currentImage === displayImages.length - 1) {
      setCurrentImage(0); 
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };
  useEffect(() => {
    const slideInterval = setInterval(nextImage, delay);
    return () => clearInterval(slideInterval);
  }, [currentImage]); 
  return (
    <div className='container mx-auto min-w-full rounded relative'>
      <div className='h-73 w-full bg-slate-200 relative md:h-70'>
      <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
      <div className=' flex justify-between w-full text-2xl '>
        <button className='bg-white shadow-md rounded-full p-1 ' onClick={prevImage}><FaAngleLeft/></button>
        <button className='bg-white shadow-md rounded-full p-1 ' onClick={nextImage}><FaAngleRight/></button>
        </div>
      </div>
        <div className='flex h-full w-full overflow-hidden'>
          {displayImages.map((imageURL, index) => (
            <div className='w-full h-full min-w-full transition-all' key={index} style={{ transform: `translateX(${-(currentImage * 100)}%)`, transition: 'transform 0.5s ease-in-out' }}>
              <img src={imageURL} alt='' className='h-full w-full ' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingProduct;
