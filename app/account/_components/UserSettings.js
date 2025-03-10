'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

function UserSettings() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 mb-20">
      <h1 className="text-3xl underline mb-10">User Settings</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-10 sm:gap-y-10 text-center text-lg sm:text-xl md:text-3xl">
        <Link
          href="/account/updatePassword"
          className="flex justify-center items-center border-2 border-white p-3 hover:bg-accent-50 rounded-md"
        >
          Update Password
        </Link>

        <Link
          href="/account/pastPayments"
          className="flex justify-center items-center border-2 border-white p-3 hover:bg-accent-50 rounded-md"
        >
          Past Payments
        </Link>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-accent-50 text-white text-lg p-1 rounded-md mt-10"
      >
        Logout
      </button>
    </div>
  );
}

export default UserSettings;
