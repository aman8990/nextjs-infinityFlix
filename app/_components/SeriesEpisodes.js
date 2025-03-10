'use client';

import { useEffect, useRef, useState } from 'react';
import Episode from './Episode';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

function SeriesEpisodes({ title, series, videoId }) {
  const scrollContainerRef = useRef(null);
  const numberOfSeasons = series.length;
  const [activeSeason, setActiveSeason] = useState(series[0].season);
  const [episodes, setEpisodes] = useState(series[0].episodes);

  useEffect(() => {
    if (!videoId) return;

    const foundSeason = series.find((season) =>
      season.episodes.some((episode) => episode.id === videoId)
    );

    if (foundSeason && foundSeason.season) {
      setActiveSeason(foundSeason.season);
      setEpisodes(foundSeason.episodes);
    }
  }, [videoId, series]);

  const styleSeason = (no) => {
    return no <= 9 ? `S0${no}` : `S${no}`;
  };

  const toggleSeason = (no) => {
    setActiveSeason(no);
    setEpisodes(series[no - 1].episodes);
  };

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
    <div>
      <div className="max-w-[60rem] mx-auto mb-10 px-2 md:px-5">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mt-10">{title}</h1>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={handleScrollLeft}>
            <IoIosArrowBack size={20} />
          </button>
          <div
            ref={scrollContainerRef}
            className="mx-5 py-5 flex gap-5 sm:gap-10 overflow-x-scroll scrollbar-none"
          >
            {[...Array(numberOfSeasons)].map((_, i) => (
              <button
                key={i}
                onClick={() => toggleSeason(i + 1)}
                className={`p-1 ${
                  activeSeason === i + 1
                    ? 'bg-accent-50 text-white rounded-md'
                    : ''
                }`}
              >
                {styleSeason(i + 1)}
              </button>
            ))}
          </div>
          <button onClick={handleScrollRight}>
            <IoIosArrowForward size={20} />
          </button>
        </div>

        <div className="flex justify-start">
          <div className="flex flex-col gap-7 overflow-y-scroll scrollbar-none scroll-smooth">
            {episodes?.map((episode) => (
              <Episode
                key={episode.id}
                episode={episode}
                isPlaying={episode.id === videoId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesEpisodes;
