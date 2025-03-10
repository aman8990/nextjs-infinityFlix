import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, description, categories, isSeries, thumbnailUrl, videoUrl } =
      body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!title || !description || !categories || !videoUrl || !thumbnailUrl) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        isSeries,
        categories,
      },
    });

    if (!newMovie) {
      return new NextResponse('Error in creating Movie', { status: 400 });
    }

    return NextResponse.json(newMovie, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_CREATING_MOVIE', error);
    return NextResponse.json('Error in creating movie', { status: 500 });
  }
}
