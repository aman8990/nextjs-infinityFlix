import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
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

    const removedMovie = await prisma.wishlist.deleteMany({
      where: { userId: currentUser.id, movieId: id },
    });

    if (removedMovie.count === 0) {
      return new NextResponse('Movie not found in wishlist', { status: 401 });
    }

    return NextResponse.json(removedMovie, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_REMOVING_MOVIE', error);
    return NextResponse.json('Error in removing movie', { status: 500 });
  }
}
