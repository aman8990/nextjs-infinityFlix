'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import useWishlistStore from '@/app/_hooks/useWishlistStore';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlay } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';

function MovieImage({ movie }) {
  const {
    wishlistMovies,
    addToWishlist,
    removeFromWishlist,
    wishlistInitialized,
    setInitialWishlist,
  } = useWishlistStore();

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
    if (movie.isSeries) {
      router.push(`/video/${movie.episodeId}?type=series`);
    } else {
      router.push(`/video/${movie.id}`);
    }
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
    <div className="rounded-md mb-5 h-[40vh] md:h-[70vh] w-[99vw] mx-auto">
      <div className="relative w-full h-full overflow-hidden">
        <div>
          <Image
            src={movie.thumbnailUrl}
            width={1000}
            height={1000}
            priority
            alt="First Image"
            className="absolute w-full h-full object-fill"
          />
          <div className="absolute bottom-10 left-4 space-x-4 flex">
            <button
              onClick={handleClickPlay}
              className="flex bg-accent-50 px-2 py-1 rounded-md gap-1 text-lg items-center font-bold"
            >
              <span>
                <FaPlay size={20} />
              </span>
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
    </div>
  );
}

export default MovieImage;
