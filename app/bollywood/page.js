import getMoviesByCategory from '../_actions/getMoviesByCategory';
import getWishlist from '../_actions/getWishlist';
import CategoryPage from '../_components/CategoryPage';
import NotFound from '../not-found';

async function Page() {
  const movies = await getMoviesByCategory('bollywood');

  if (!movies) return <NotFound title="No Movies Found" />;

  return (
    <div className="fixed top-16 md:top-24 w-full h-full overflow-y-scroll scrollbar-none pb-32">
      <CategoryPage title="Bollywood" movies={movies} />
    </div>
  );
}

export default Page;
