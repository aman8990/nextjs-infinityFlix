import { groupEpisodesBySeason } from '@/app/_utils/groupEpisodesBySeason';
import MoreInfo from '@/app/video/[videoId]/_components/MoreInfo';

function SeriesDetails({ movie }) {
  const episodes = movie.episodes;
  const result = groupEpisodesBySeason(episodes);

  return (
    <div>
      <MoreInfo isSeries={true} series={result} />
    </div>
  );
}

export default SeriesDetails;
