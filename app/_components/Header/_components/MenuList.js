import Link from 'next/link';
import { usePathname } from 'next/navigation';

function MenuList() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav className="hidden md:block">
      <ul className="flex top-[2px] relative space-x-5 lg:space-x-10">
        <Link
          href="/"
          className={`hover:text-accent-50 p-2 ${
            isActive('/') ? 'text-accent-50' : ''
          }`}
        >
          Home
        </Link>

        <Link
          href="/search"
          className={`hover:text-accent-50 p-2 ${
            isActive('/search') ? 'text-accent-50' : ''
          }`}
        >
          Search
        </Link>

        <Link
          href="/contactUs"
          className={`hover:text-accent-50 p-2 ${
            isActive('/contactUs') ? 'text-accent-50' : ''
          }`}
        >
          Contact Us
        </Link>
      </ul>
    </nav>
  );
}

export default MenuList;
