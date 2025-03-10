import getCurrentUser from '@/app/_actions/getCurrentUser';
import prismadb from '@/app/_libs/prismadb';

async function getContinueWatching() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.id) {
      return [];
    }

    const userId = currentUser?.id;

    const continueWatching = await prismadb.continueWatching.findMany({
      where: { userId },
      include: {
        movie: true,
        episode: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return continueWatching;
  } catch (error) {
    console.error('Failed to fetch movie', error);
    return [];
  }
}

export default getContinueWatching;
