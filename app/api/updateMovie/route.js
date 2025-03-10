import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { updatedData, id } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!id || !updatedData) {
      return new NextResponse('Info not available', { status: 400 });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: updatedData,
    });

    if (!updatedMovie) {
      return new NextResponse('Movie not found', { status: 401 });
    }

    return NextResponse.json(updatedMovie, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_UPDATING_MOVIE', error);
    return NextResponse.json('Error in updating movie', { status: 500 });
  }
}
