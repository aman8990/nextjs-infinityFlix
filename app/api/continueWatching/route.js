import { NextResponse } from 'next/server';
import prismadb from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function POST(request) {
  try {
    const body = await request.json();
    const { movieId, episodeId, progress, runtime } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.id) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!progress || (!movieId && !episodeId)) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const userId = currentUser?.id;

    const existingRecord = await prismadb.continueWatching.findFirst({
      where: { userId, movieId, episodeId },
    });

    if (existingRecord) {
      await prismadb.continueWatching.update({
        where: { id: existingRecord.id },
        data: { progress },
      });
    } else {
      await prismadb.continueWatching.create({
        data: { userId, movieId, episodeId, progress, runtime },
      });

      const userRecords = await prismadb.continueWatching.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        skip: 5,
      });

      if (userRecords.length > 0) {
        await prismadb.continueWatching.deleteMany({
          where: { id: { in: userRecords.map((record) => record.id) } },
        });
      }
    }

    return NextResponse.json('Progress saved', { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_SAVING_PROGRESS', error);
    return NextResponse.json('Error in saving progress', { status: 500 });
  }
}
