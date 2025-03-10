'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import useWishlistStore from '@/app/_hooks/useWishlistStore';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleInfo, FaPlay } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';

function SearchedMovie({ movie, isContinueWatching }) {
  const {
    wishlistMovies,
    addToWishlist,
    removeFromWishlist,
    wishlistInitialized,
    setInitialWishlist,
  } = useWishlistStore();

  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const id = movie?.id;

  useEffect(() => {
    if (!wishlistInitialized) {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get('/api/getWishlist');

          setInitialWishlist(res.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

      fetchWishlist();
    }
  }, [wishlistInitialized, setInitialWishlist]);

  const handleClickPlay = () => {
    if (!showButtons) return;

    if (movie.isSeries) {
      router.push(`/video/${movie.episodeId}?type=series`);
    } else {
      router.push(`/video/${movie.id}`);
    }
  };

  const handleClickInfo = () => {
    if (!showButtons) return;
    router.push(`/title/${movie.id}`);
  };

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

  const isWishlisted = wishlistMovies.some((m) => m.id === movie.id);

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative flex-shrink-0 max-w-[20rem] sm:w-[18rem] md:w-[18rem] max-h-[12rem] sm:h-[18rem] md:h-[18rem] overflow-hidden rounded-md mx-1"
    >
      <Image
        src={movie.thumbnailUrl}
        alt="movie-image"
        width={300}
        height={300}
        className="w-full h-full object-cover"
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/40 ${
          showButtons ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        } transition duration-300`}
      >
        <div className="flex gap-6">
          <button
            onClick={handleClickPlay}
            className="p-2 bg-white rounded-full"
          >
            <FaPlay size={20} className="text-red-600" />
          </button>

          {isWishlisted ? (
            <button
              onClick={handleRemove}
              className="p-2 bg-white rounded-full"
            >
              {isLoading ? (
                <SpinnerMini size={20} />
              ) : (
                <MdFavorite size={20} className="text-red-600" />
              )}
            </button>
          ) : (
            <button onClick={handleAdd} className="p-2 bg-white rounded-full">
              {isLoading ? (
                <SpinnerMini size={20} />
              ) : (
                <MdFavorite size={20} className="text-gray-600" />
              )}
            </button>
          )}
        </div>

        <button onClick={handleClickInfo} className="bg-gray-600 rounded-full">
          <FaCircleInfo size={30} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default SearchedMovie;
