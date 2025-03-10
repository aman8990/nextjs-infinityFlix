'use client';

import MobileButton from './_components/MobileButton';

function HeaderMobile() {
  return (
    <div className="bottom-0 fixed z-40 py-2 w-full px-4 border-t-2 md:border-none border-primary-700 md:p-0 bg-black">
      <MobileButton />
    </div>
  );
}

export default HeaderMobile;
