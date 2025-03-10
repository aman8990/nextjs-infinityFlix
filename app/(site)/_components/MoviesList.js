'use client';

import { useRef, useState } from 'react';
import Movie from './Movie';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import useWishlistStore from '@/app/_hooks/useWishlistStore';

function MoviesList({ title, movies, href }) {
  const { wishlistMovies, addToWishlist, removeFromWishlist } =
    useWishlistStore();

  const router = useRouter();
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
        <button
          onClick={() => router.push(`/${href}`)}
          className="flex items-center gap-1 hover:bg-gray-500 rounded-md py-0.5 md:py-1 px-2"
        >
          <span>View All</span>
          <span>
            <IoIosArrowForward />
          </span>
        </button>
      </div>
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-2 md:gap-3 overflow-x-scroll scrollbar-none scroll-smooth"
      >
        {movies?.map((movie) => {
          const isWishlisted = wishlistMovies?.some((w) => w.id === movie.id);

          return (
            <Movie
              key={movie.id}
              movie={movie}
              isWishlisted={isWishlisted}
              onRemove={() => removeFromWishlist(movie.id)}
              onAdd={() => addToWishlist(movie)}
            />
          );
        })}
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

export default MoviesList;
