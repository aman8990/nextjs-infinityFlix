'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa6';

function Episode({ episode, isPlaying }) {
  const router = useRouter();

  const styleSeason = (no) => {
    return no <= 9 ? `S0${no}` : `S${no}`;
  };

  const styleEpisode = (no) => {
    return no <= 9 ? `E0${no}` : `E${no}`;
  };

  const handleClickPlay = () => {
    router.push(`/video/${episode.id}?type=series`);
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="relative flex-shrink-0 w-[6rem] h-[3.5rem] md:w-[10rem] md:h-[6rem] overflow-hidden rounded-md mx-1">
          <Image
            src={episode.thumbnailUrl}
            alt="movie-image"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center gap-12 bg-black/40">
            <button onClick={handleClickPlay} className="p-2">
              <FaPlay size={20} className="text-accent-50" />
            </button>
          </div>
        </div>

        <div>
          <div
            className={`flex flex-col sm:flex-row sm:gap-3 text-base md:text-lg font-semibold whitespace-nowrap ${
              isPlaying ? 'text-accent-50' : ''
            }`}
          >
            <h1>
              {styleSeason(episode.season)}{' '}
              {styleEpisode(episode.episodeNumber)}
            </h1>
            <h1 className="hidden sm:flex"> : </h1>
            <h1>{episode.title}</h1>
          </div>
          <h1 className="text-sm text-gray-300 hidden md:flex">
            {episode.description}
          </h1>
        </div>
      </div>
      <h1 className="text-sm text-gray-300 my-1 mx-1 md:hidden">
        {episode.description}
      </h1>
    </div>
  );
}

export default Episode;
