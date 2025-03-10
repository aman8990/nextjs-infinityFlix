'use server';

import prisma from '@/app/_libs/prismadb';
import getCurrentUser from './getCurrentUser';

async function getWishlist() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const userId = currentUser?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        wishlist: {
          include: {
            movie: true,
          },
        },
      },
    });

    const movies = user?.wishlist?.map((item) => item.movie) || [];

    return movies;
  } catch (error) {
    console.error('Failed to fetch movie', error);
    return [];
  }
}

export default getWishlist;
