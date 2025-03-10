import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { id } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!id) {
      return new NextResponse('ID is required', { status: 401 });
    }

    const episode = await prisma.episode.findUnique({
      where: { id },
    });

    if (!episode) {
      return NextResponse.json('Episode not found', { status: 400 });
    }

    return NextResponse.json(episode);
  } catch (error) {
    console.log('ERROR_IN_GETTING_EPISODE', error);
    return NextResponse.json('Error in fetching episode', { status: 500 });
  }
}
