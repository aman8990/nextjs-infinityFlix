'use server';

import prisma from '@/app/_libs/prismadb';
import getCurrentUser from './getCurrentUser';

async function getUserQueries() {
  try {
    const currentUser = await getCurrentUser();

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      throw new Error('User not authenticated');
    }

    const queries = await prisma.contactUs.findMany({});

    return queries || [];
  } catch (error) {
    console.error('Failed to fetch queries', error);
    return [];
  }
}

export default getUserQueries;
