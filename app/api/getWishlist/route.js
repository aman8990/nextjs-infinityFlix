import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        wishlist: {
          include: {
            movie: true,
          },
        },
      },
    });

    const movies = user?.wishlist?.map((item) => item.movie) || [];

    return NextResponse.json(movies);
  } catch (error) {
    console.log('ERROR_IN_GETTING_WATCHLIST', error);
    return NextResponse.json('Error in fetching watchlist', { status: 500 });
  }
}
