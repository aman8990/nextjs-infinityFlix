'use client';

import { signOut } from 'next-auth/react';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';

function AdminHeader({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="flex justify-center border-b-2 border-white">
      <button
        onClick={toggleSidebar}
        className="text-white left-5 top-[1.4rem] sm:top-[1.9rem] fixed md:hidden"
      >
        {isSidebarOpen ? <HiX size={30} /> : <HiMenu size={30} />}
      </button>

      <div className="text-center sm:mt-8 sm:mb-6 mt-6 mb-4 text-2xl sm:text-3xl">
        Admin Panel
      </div>

      <button
        onClick={() => signOut()}
        className="md:px-2 md:py-1 md:bg-accent-600 text-white md:rounded-md right-5 sm:top-[1.9rem] top-[1.4rem] fixed"
      >
        <span className="md:hidden block">
          <IoLogOut size={30} />
        </span>
        <span className="hidden md:block">Sign out</span>
      </button>
    </div>
  );
}

export default AdminHeader;
