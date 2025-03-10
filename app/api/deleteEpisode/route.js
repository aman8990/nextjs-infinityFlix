import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

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
      return new NextResponse('Info not available', { status: 400 });
    }

    const deletedEpisode = await prisma.episode.delete({
      where: { id },
    });

    if (!deletedEpisode) {
      return new NextResponse('Episode not found', { status: 401 });
    }

    return NextResponse.json(deletedEpisode, { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_DELETING_EPISODE', error);
    return NextResponse.json('Error in deleting episode', { status: 500 });
  }
}
