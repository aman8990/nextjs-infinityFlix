'use server';

import prisma from '@/app/_libs/prismadb';

async function getEpisode(episodeId) {
  try {
    const episode = await prisma.episode.findUnique({
      where: {
        id: episodeId,
      },
    });

    return episode;
  } catch (error) {
    console.error('Failed to fetch movie', error);
    return [];
  }
}

export default getEpisode;
