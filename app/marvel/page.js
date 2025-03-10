import CategoryPage from '../_components/CategoryPage';
import getMoviesByCategory from '../_actions/getMoviesByCategory';
import NotFound from '../not-found';
import getWishlist from '../_actions/getWishlist';

async function Page() {
  const movies = await getMoviesByCategory('marvel');

  if (!movies) return <NotFound title="No Movies Found" />;

  return (
    <div className="fixed top-16 md:top-24 w-full h-full overflow-y-scroll scrollbar-none pb-32">
      <CategoryPage title="Marvel" movies={movies} />
    </div>
  );
}

export default Page;
