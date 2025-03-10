import getMovie from '@/app/_actions/getMovie';
import MoreInfo from './_components/MoreInfo';
import VideoPlayer from './_components/VideoPlayer';
import NotFound from '@/app/not-found';
import { ObjectId } from 'bson';
import getEpisode from '@/app/_actions/getEpisode';
import { groupEpisodesBySeason } from '@/app/_utils/groupEpisodesBySeason';
import getMoviesByCategory from '@/app/_actions/getMoviesByCategory';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import { redirect } from 'next/navigation';

async function Page({ params, searchParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }

  const subscribedUpto = new Date(currentUser.subscribedUpto);
  const currentTime = new Date();

  const isSubscribed = subscribedUpto > currentTime;

  if (currentUser.subscribedUpto === null || !isSubscribed) {
    redirect('/subscribe');
  }

  const { videoId } = await params;
  const { type, progress } = await searchParams;

  if (!ObjectId.isValid(videoId)) {
    return <NotFound title="Invalid Video ID" />;
  }

  const isSeries = !!(type === 'series');

  let movie;
  let series;
  let movies;
  let result;

  if (isSeries) {
    movie = await getEpisode(videoId);
    series = await getMovie(movie.movieId);

    const episodes = series.episodes;
    result = groupEpisodesBySeason(episodes);
  } else {
    movie = await getMovie(videoId);
    movies = await getMoviesByCategory(movie.categories[0]);
  }

  if (!movie) return <NotFound title="Movie Not Found" />;

  const styleSeason = (no) => {
    return no <= 9 ? `S0${no}` : `S${no}`;
  };

  const styleEpisode = (no) => {
    return no <= 9 ? `E0${no}` : `E${no}`;
  };

  const movieSrc = movie?.videoUrl;
  const title = isSeries
    ? `${styleSeason(movie.season)} ${styleEpisode(movie.episodeNumber)}`
    : movie.title;

  return (
    <div className="fixed top-16 md:top-28 inset-0 overflow-y-scroll scrollbar-none">
      <VideoPlayer
        src={movieSrc}
        title={title}
        videoId={videoId}
        progress={progress}
        isSeries={isSeries}
      />
      {isSeries ? (
        <MoreInfo isSeries={isSeries} series={result} videoId={videoId} />
      ) : (
        <MoreInfo isSeries={isSeries} movies={movies} />
      )}
    </div>
  );
}

export default Page;
