import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { TbMessageFilled } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RiSearchFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';

function MobileButton() {
  // const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav>
      <ul className="flex md:hidden justify-between">
        <li className="p-2">
          <Link href="/">
            <IoMdHome
              size={30}
              className={isActive('/') ? 'text-accent-50' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/search">
            <RiSearchFill
              size={30}
              className={isActive('/search') ? 'text-accent-50' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/contactUs">
            <TbMessageFilled
              size={30}
              className={isActive('/contactUs') ? 'text-accent-50' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/wishlist">
            <MdFavorite
              size={30}
              className={isActive('/wishlist') ? 'text-accent-50' : ''}
            />
          </Link>
        </li>
        <li className="p-2">
          <Link href="/account">
            <IoPerson
              size={30}
              className={isActive('/account') ? 'text-accent-50' : ''}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MobileButton;
