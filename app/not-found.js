'use client';

import Link from 'next/link';

function NotFound({ title }) {
  return (
    <main className="fixed top-52 space-y-6 w-full">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-semibold">
          {title || 'This Page could not be found :('}
        </h1>
        <Link
          href="/"
          className="flex bg-accent-50 text-white rounded-md px-6 py-3 text-lg"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
