'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { FaCircleInfo } from 'react-icons/fa6';

function ContinueWatchingMovie({ movie }) {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const isMovie = movie?.movieId !== null;
  const finalMovie = isMovie ? movie.movie : movie.episode;
  const id = movie?.movieId || movie?.episodeId;
  const titleId = isMovie ? finalMovie.id : finalMovie.movieId;
  const progress = movie?.progress;

  const handleClickPlay = () => {
    if (!showButtons) return;

    if (!isMovie) {
      router.push(`/video/${id}?type=series&progress=${progress}`);
    } else {
      router.push(`/video/${id}?progress=${progress}`);
    }
  };

  const handleClickInfo = () => {
    if (!showButtons) return;
    router.push(`/title/${titleId}`);
  };

  const progressPercent =
    movie?.progress && movie?.runtime
      ? (movie.progress / movie.runtime) * 100
      : 0;

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="relative flex-shrink-0 w-[9rem] md:w-[18rem] h-[5rem] md:h-[10rem] overflow-hidden rounded-md"
    >
      <div className="relative w-full h-full">
        <Image
          src={finalMovie?.thumbnailUrl}
          alt="movie-image"
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-600">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1 md:gap-6 bg-black/40 ${
          showButtons ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        } transition duration-300`}
      >
        <div className="flex gap-2 md:gap-6">
          <button
            onClick={handleClickPlay}
            className="p-2 bg-white rounded-full"
          >
            <FaPlay size={20} className="text-red-600" />
          </button>

          <button
            onClick={handleClickInfo}
            className="bg-gray-600 rounded-full"
          >
            <FaCircleInfo size={35} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContinueWatchingMovie;
