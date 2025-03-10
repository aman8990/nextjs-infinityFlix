'use server';

import prisma from '@/app/_libs/prismadb';

async function getRandom() {
  try {
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * (movieCount - 1));

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return randomMovies;
  } catch (error) {
    return [];
  }
}

export default getRandom;
