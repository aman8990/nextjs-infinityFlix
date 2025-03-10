import HomepageImage from '@/app/_components/HomepageImage';
import LatestRelease from './_components/LatestRelease';
import Marvel from './_components/Marvel';
import Dc from './_components/Dc';
import Bollywood from './_components/Bollywood';
import ContinueWatching from './_components/ContinueWatching';
import Punjabi from './_components/Punjabi';
import Hollywood from './_components/Hollywood';
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
