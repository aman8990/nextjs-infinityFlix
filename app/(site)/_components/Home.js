'use client';

import HomepageImage from '@/app/_components/HomepageImage';
import LatestRelease from './LatestRelease';
import Marvel from './Marvel';
import Dc from './Dc';
import Bollywood from './Bollywood';
import ContinueWatching from './ContinueWatching';
import Punjabi from './Punjabi';
import Hollywood from './Hollywood';
import useWishlistStore from '@/app/_hooks/useWishlistStore';
import { useEffect } from 'react';

function Home({
  continueWatching,
  latest,
  marvel,
  dc,
  hollywood,
  bollywood,
  punjabi,
  randomMovie,
  initialWishlist,
}) {
  const { wishlistInitialized, setInitialWishlist } = useWishlistStore();

  useEffect(() => {
    if (!wishlistInitialized) {
      setInitialWishlist(initialWishlist);
    }
  }, [wishlistInitialized, setInitialWishlist, initialWishlist]);

  return (
    <div className="fixed top-8 md:top-16 inset-0 pb-24 overflow-y-scroll scrollbar-none">
      <HomepageImage movie={randomMovie} />
      {continueWatching.length !== 0 && (
        <ContinueWatching movies={continueWatching} />
      )}
      <LatestRelease movies={latest} />
      <Marvel movies={marvel} />
      <Dc movies={dc} />
      <Hollywood movies={hollywood} />
      <Bollywood movies={bollywood} />
      <Punjabi movies={punjabi} />
    </div>
  );
}

export default Home;
