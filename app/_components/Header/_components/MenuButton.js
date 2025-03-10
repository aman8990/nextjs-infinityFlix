'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoPerson } from 'react-icons/io5';
import { MdFavorite } from 'react-icons/md';

function MenuButton() {
  // const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-4 lg:space-x-8">
        <Link href="/wishlist" className="hover:text-accent-50 p-2">
          <MdFavorite
            size={25}
            className={isActive('/wishlist') ? 'text-accent-50' : ''}
          />
        </Link>

        <Link href="/account" className="hover:text-accent-50 p-2">
          <IoPerson
            size={25}
            className={isActive('/account') ? 'text-accent-50' : ''}
          />
        </Link>
      </ul>
    </nav>
  );
}

export default MenuButton;
