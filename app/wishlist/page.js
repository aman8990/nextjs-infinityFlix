import CategoryPage from '../_components/CategoryPage';
import getWishlist from '../_actions/getWishlist';

async function Page() {
  const movies = await getWishlist();

  if (movies.length === 0) {
    return <div>No Movies</div>;
  }

  return (
    <div className="fixed top-16 md:top-24 w-full h-full overflow-y-scroll scrollbar-none pb-32">
      <CategoryPage title="Wishlist" movies={movies} />
    </div>
  );
}

export default Page;
