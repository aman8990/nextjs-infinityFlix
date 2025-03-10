import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function POST(request) {
  try {
    const body = await request.json();
    let { title } = body;

    if (!title) {
      return new NextResponse('ID is required', { status: 401 });
    }

    title = title
      .split(' ')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join(' ');

    const movie = await prisma.movie.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    if (!movie) {
      return NextResponse.json('Movie not found', { status: 400 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.log('ERROR_IN_GETTING_MOVIE', error);
    return NextResponse.json('Error in fetching movie', { status: 500 });
  }
}
