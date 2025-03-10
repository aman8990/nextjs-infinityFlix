import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'bson';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const {
      title,
      season,
      episodeNumber,
      movieId,
      description,
      thumbnailUrl,
      videoUrl,
    } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (
      !title ||
      !movieId ||
      !description ||
      !season ||
      !episodeNumber ||
      !videoUrl ||
      !thumbnailUrl
    ) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
      select: { isSeries: true, id: true },
    });

    if (!existingMovie) {
      return new NextResponse('Movie not available', { status: 400 });
    }

    if (!existingMovie.isSeries) {
      return new NextResponse('This is not Series', { status: 400 });
    }

    const data = {
      title,
      movieId: existingMovie.id,
      season: parseInt(season, 10),
      episodeNumber: parseInt(episodeNumber, 10),
      description,
      thumbnailUrl,
      videoUrl,
    };

    const newEpisode = await prisma.episode.create({
      data,
    });

    if (!newEpisode) {
      return new NextResponse('Error in creating Episode', { status: 400 });
    }

    return NextResponse.json(newEpisode, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_CREATING_EPISODE', error);
    return NextResponse.json('Error in creating episode', { status: 500 });
  }
}
