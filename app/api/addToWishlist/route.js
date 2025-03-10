import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!id) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const existingMovie = await prisma.wishlist.findMany({
      where: { userId: currentUser.id, movieId: id },
    });

    if (existingMovie.length !== 0) {
      return new NextResponse('Movie already in wishlist', {
        status: 401,
      });
    }

    const addedMovie = await prisma.wishlist.create({
      data: { userId: currentUser.id, movieId: id },
    });

    if (!addedMovie) {
      return new NextResponse('Not able to add movie to wishlist', {
        status: 401,
      });
    }

    return NextResponse.json(addedMovie, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_ADDING_MOVIE', error);
    return NextResponse.json('Error in adding movie', { status: 500 });
  }
}
