'use client';

import { useState } from 'react';
import AdminSidebar from '../_components/AdminSidebar';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`scrollbar-thin md:static md:translate-x-0 md:w-[15rem] lg:w-[20rem] fixed top-0 mt-[4.6rem] md:mt-[7rem] left-0 h-full w-[18rem] bg-black border-r-2 border-primary-700 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:flex md:flex-col overflow-y-auto transition-transform duration-300 z-50 `}
        >
          <AdminSidebar toggleSidebar={toggleSidebar} />
        </div>

        <div
          onClick={toggleSidebar}
          className="flex fixed md:hidden top-1/2 bottom-1/2 cursor-pointer"
        >
          <HiOutlineDotsCircleHorizontal size={40} className="text-accent-50" />
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 md:hidden z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-none">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
