'use server';

import prisma from '@/app/_libs/prismadb';

async function getMovie(titleId) {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: titleId,
      },
      include: {
        episodes: true,
      },
    });

    return movie;
  } catch (error) {
    console.error('Failed to fetch movie', error);
    return [];
  }
}

export default getMovie;
