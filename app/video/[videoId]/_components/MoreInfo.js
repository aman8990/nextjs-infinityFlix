import CategoryPage from '@/app/_components/CategoryPage';
import { FaArrowCircleRight } from 'react-icons/fa';
import SeriesEpisodes from '@/app/_components/SeriesEpisodes';

function MoreInfo({ isSeries, series, movies, videoId }) {
  return (
    <div className="mb-32">
      <div>
        {isSeries ? (
          <SeriesEpisodes series={series} videoId={videoId} title="Episodes" />
        ) : (
          <CategoryPage movies={movies} title="More Like This" />
        )}
      </div>
    </div>
  );
}

export default MoreInfo;
