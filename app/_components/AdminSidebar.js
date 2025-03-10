'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiServer, HiAnnotation } from 'react-icons/hi';
import { HiMiniDocumentPlus } from 'react-icons/hi2';
import { IoClose, IoSearch } from 'react-icons/io5';
import { GrDocumentUpdate } from 'react-icons/gr';
import { RiDeleteBinFill } from 'react-icons/ri';

function AdminSidebar({ toggleSidebar }) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const spanClass = 'flex mt-1.5 items-center text-xl md:text-lg lg:text-xl';

  return (
    <nav>
      <ul className="mx-3 space-y-8 mt-5 mb-40">
        <li className="flex md:hidden justify-center">
          <IoClose size={35} onClick={toggleSidebar} />
        </li>
        <li>
          <Link
            href="/adminPanel/dashboard"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/dashboard')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <HiServer size={35} />
            <span className={`${spanClass}`}>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/searchMovie"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/searchMovie')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <IoSearch size={30} />
            <span className={`${spanClass}`}>Search Movie</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/createMovie"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/createMovie')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <HiMiniDocumentPlus size={30} />
            <span className={`${spanClass}`}>Create Movie</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/createEpisode"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/createEpisode')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <HiMiniDocumentPlus size={30} />
            <span className={`${spanClass}`}>Create Episode</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/updateMovie"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/updateMovie')
                ? ' rounded-md bg-accent-50 text-white md:text-lg lg:text-xl'
                : ''
            }`}
          >
            <GrDocumentUpdate size={30} />
            <span className={`${spanClass}`}>Update Movie</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/updateEpisode"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/updateEpisode')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <GrDocumentUpdate size={30} />
            <span className={`${spanClass}`}>Update Episode</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/deleteMovie"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/deleteMovie')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <RiDeleteBinFill size={30} />
            <span className={`${spanClass}`}>Delete Movie</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/deleteEpisode"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/deleteEpisode')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <RiDeleteBinFill size={30} />
            <span className={`${spanClass}`}>Delete Episode</span>
          </Link>
        </li>

        <li>
          <Link
            href="/adminPanel/userQueries"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/adminPanel/userQueries')
                ? ' rounded-md bg-accent-50 text-white'
                : ''
            }`}
          >
            <HiAnnotation size={30} />
            <span className={`${spanClass}`}>User Queries</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSidebar;
