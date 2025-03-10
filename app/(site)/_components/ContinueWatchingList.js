'use client';

import { useRef, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import ContinueWatchingMovie from './ContinueWatchingMovie';

function ContinueWatchingList({ title, movies }) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full mb-10">
      <div className="flex justify-between md:mb-2 mx-2 items-center">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
      </div>
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-2 md:gap-3 overflow-x-scroll scrollbar-none scroll-smooth"
      >
        {movies?.map((movie) => (
          <ContinueWatchingMovie key={movie.id} movie={movie} />
        ))}
      </div>

      <button
        onClick={handleScrollLeft}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`absolute left-0 top-1/2  bg-black/70 p-1 md:p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <IoIosArrowBack size={30} color="white" />
      </button>

      <button
        onClick={handleScrollRight}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`absolute right-0 top-1/2 bg-black/70 p-1 md:p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <IoIosArrowForward size={30} color="white" />
      </button>
    </div>
  );
}

export default ContinueWatchingList;
