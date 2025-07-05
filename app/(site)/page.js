import getMovies from '../_actions/getMovies';
import getRandom from '../_actions/getRandom';
import getWishlist from '../_actions/getWishlist';
import Home from './_components/Home';
import getContinueWatching from '../_actions/getContinueWatching';

async function Page() {
  const continueWatching = await getContinueWatching();
  const { latest, marvel, dc, hollywood, bollywood, punjabi } =
    await getMovies();

  const randomMovie = await getRandom();
  const initialWishlist = await getWishlist();

  return (
    <div>
      <Home
        continueWatching={continueWatching}
        latest={latest}
        marvel={marvel}
        dc={dc}
        hollywood={hollywood}
        bollywood={bollywood}
        punjabi={punjabi}
        randomMovie={randomMovie[0]}
        initialWishlist={initialWishlist}
      />
    </div>
  );
}

export default Page;
