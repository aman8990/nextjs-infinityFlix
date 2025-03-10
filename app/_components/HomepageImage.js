'use client';

import { useRouter } from 'next/navigation';
import '@/app/animation.css';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';
import { useState, useEffect } from 'react';
import useWishlistStore from '../_hooks/useWishlistStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import SpinnerMini from './SpinnerMini';
import { useSession } from 'next-auth/react';

function HomepageImage({ movie }) {
  const { wishlistMovies, addToWishlist, removeFromWishlist } =
    useWishlistStore();

  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = movie.id;
  const isDisabled = !!(status === 'unauthenticated');

  const handleClickPlay = () => {
    if (movie.isSeries) {
      router.push(`/video/${movie.episodeId}?type=series`);
    } else {
      router.push(`/video/${movie.id}`);
    }
  };

  const isWishlisted = wishlistMovies.some((m) => m.id === movie?.id);

  const handleRemove = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete('/api/removeFromWishlist', { data: { id } });

      toast.dismiss();
      toast.success('Movie Removed');
      removeFromWishlist(id);
    } catch (error) {
      console.log('Error in removing movie', error);
      toast.dismiss();
      toast.error(error.response.data || 'Error in removing movie');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.post('/api/addToWishlist', { id });

      toast.dismiss();
      toast.success('Movie Added');
      addToWishlist(movie);
    } catch (error) {
      console.log('Error in adding movie', error);
      toast.dismiss();
      toast.error(error.response.data || 'Error in adding movie');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="pt-10 rounded-md mb-12 h-[40vh] md:h-[70vh] w-[99vw] mx-auto relative">
        <div className="absolute inset-0">
          <Image
            src={movie.thumbnailUrl}
            width={1920}
            height={1080}
            priority
            alt="movie-random"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="absolute bottom-10 left-4 space-x-4 flex">
          <button
            onClick={handleClickPlay}
            className="flex bg-accent-50 px-2 py-1 rounded-md gap-1 text-lg items-center font-bold"
          >
            <FaPlay size={20} />
            <span>Play</span>
          </button>

          {isWishlisted ? (
            <button
              onClick={handleRemove}
              className="flex bg-red-100 text-accent-50 px-2 py-1 rounded-md gap-1 text-lg items-center font-medium"
            >
              <MdFavorite size={20} color="#E50914" />
              <span>Wishlisted</span>
            </button>
          ) : (
            <button
              onClick={handleAdd}
              disabled={isDisabled}
              className="flex bg-gray-300 text-black px-2 py-1 rounded-md gap-1 text-lg items-center font-medium"
            >
              <MdFavorite size={20} />
              <span>Wishlist</span>
            </button>
          )}
          {isLoading && (
            <div className="flex items-center">
              <SpinnerMini size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomepageImage;
