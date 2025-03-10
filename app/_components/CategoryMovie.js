'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCircleInfo, FaPlay } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';
import SpinnerMini from './SpinnerMini';
import axios from 'axios';
import toast from 'react-hot-toast';

function CategoryMovie({
  movie,
  isContinueWatching,
  isWishlisted,
  onRemove,
  onAdd,
}) {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = movie?.id;

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
    if (!showButtons || !id) return;

    setIsLoading(true);
    try {
      await axios.delete('/api/removeFromWishlist', { data: { id } });

      toast.dismiss();
      toast.success('Movie Removed');
      onRemove(id);
    } catch (error) {
      console.log('Error in removing movie', error);
      toast.dismiss();
      toast.error(error.response.data || 'Error in removing movie');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!showButtons || !id) return;

    setIsLoading(true);
    try {
      await axios.post('/api/addToWishlist', { id });

      toast.dismiss();
      toast.success('Movie Added');
      onAdd(movie);
    } catch (error) {
      console.log('Error in adding movie', error);
      toast.dismiss();
      toast.error(error.response.data || 'Error in adding movie');
    } finally {
      setIsLoading(false);
    }
  };

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

export default CategoryMovie;
