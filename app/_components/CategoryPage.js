'use client';

import { useEffect } from 'react';
import useWishlistStore from '../_hooks/useWishlistStore';
import CategoryMovie from './CategoryMovie';
import axios from 'axios';

function CategoryPage({ title, movies }) {
  const {
    wishlistMovies,
    addToWishlist,
    removeFromWishlist,
    wishlistInitialized,
    setInitialWishlist,
  } = useWishlistStore();

  useEffect(() => {
    if (!wishlistInitialized) {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get('/api/getWishlist');

          setInitialWishlist(res.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

      fetchWishlist();
    }
  }, [wishlistInitialized, setInitialWishlist]);

  const isContinueWatching = title === 'Conitnue Watching...';

  return (
    <div className="w-full mb-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mt-10 mb-10">{title}</h1>
      </div>
      <div className="flex justify-center">
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 overflow-y-scroll scrollbar-none scroll-smooth"> */}
        <div
          className={`grid gap-2 md:gap-3 overflow-y-scroll scrollbar-none scroll-smooth ${
            movies?.length === 1
              ? 'grid-cols-1 place-items-center'
              : movies?.length === 2
              ? 'grid grid-cols-1 sm:grid-cols-2 place-items-center'
              : movies.length === 3
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center'
              : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          {movies?.map((movie) => {
            const isWishlisted = wishlistMovies?.some((w) => w.id === movie.id);

            return (
              <CategoryMovie
                key={movie.id}
                movie={movie}
                isWishlisted={isWishlisted}
                isContinueWatching={isContinueWatching}
                onRemove={() => removeFromWishlist(movie.id)}
                onAdd={() => addToWishlist(movie)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
