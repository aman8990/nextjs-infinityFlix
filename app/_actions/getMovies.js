'use server';

import prisma from '@/app/_libs/prismadb';

async function getMovies() {
  try {
    const categories = [
      'latest',
      'marvel',
      'dc',
      'hollywood',
      'bollywood',
      'punjabi',
    ];

    const moviePromises = categories.map(async (category) => {
      const movieCount = await prisma.movie.count({
        where: {
          categories: {
            has: category,
          },
        },
      });

      const randomIndex = Math.max(
        0,
        Math.floor(Math.random() * (movieCount - 10))
      );

      return prisma.movie.findMany({
        where: {
          categories: {
            has: category,
          },
        },
        take: 10,
        skip: randomIndex,
        orderBy: {
          id: 'desc',
        },
      });
    });

    const [latest, marvel, dc, hollywood, bollywood, punjabi] =
      await Promise.all(moviePromises);

    return { latest, marvel, dc, hollywood, bollywood, punjabi };
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return { marvel: [], dc: [], hollywood: [], bollywood: [], punjabi: [] };
  }
}

export default getMovies;
