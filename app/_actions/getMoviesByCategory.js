'use server';

import prisma from '@/app/_libs/prismadb';

async function getMoviesByCategory(category) {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        categories: {
          has: category,
        },
      },
    });

    return movies;
  } catch (error) {
    return [];
  }
}

export default getMoviesByCategory;
