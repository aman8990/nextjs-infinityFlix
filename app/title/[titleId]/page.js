import MovieTitle from './_components/MovieTitle';
import MovieImage from './_components/MovieImage';
import MoreInfo from '@/app/video/[videoId]/_components/MoreInfo';
import getMovie from '@/app/_actions/getMovie';
import { ObjectId } from 'bson';
import NotFound from '@/app/not-found';
import { groupEpisodesBySeason } from '@/app/_utils/groupEpisodesBySeason';

async function page({ params }) {
  const { titleId } = await params;

  if (!ObjectId.isValid(titleId)) {
    return <NotFound title="Invalid Title ID" />;
  }

  const movie = await getMovie(titleId);

  if (!movie) return <NotFound title="Movie Not Found" />;

  const isSeries = movie.isSeries;
  const episodes = movie.episodes;

  const result = groupEpisodesBySeason(episodes);

  return (
    <div className="fixed top-[4.5rem] md:top-[7rem] inset-0 pb-24 overflow-y-scroll scrollbar-none">
      <MovieImage movie={movie} />
      <MovieTitle movie={movie} />
      {isSeries && <MoreInfo isSeries={true} series={result} />}
    </div>
  );
}

export default page;
