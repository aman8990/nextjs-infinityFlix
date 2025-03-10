import { create } from 'zustand';

const useWishlistStore = create((set) => ({
  wishlistMovies: [],
  wishlistInitialized: false,

  setInitialWishlist: (movies) =>
    set((state) =>
      state.wishlistInitialized
        ? state
        : { wishlistMovies: movies, wishlistInitialized: true }
    ),

  addToWishlist: (movie) =>
    set((state) => ({
      wishlistMovies: [...state.wishlistMovies, movie],
    })),

  removeFromWishlist: (movieId) =>
    set((state) => ({
      wishlistMovies: state.wishlistMovies.filter((m) => m.id !== movieId),
    })),
}));

export default useWishlistStore;
