'use client';

import Button from '@/app/_components/Button';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function UserInfo({ user }) {
  const router = useRouter();

  if (!user) {
    return <div className="text-center mt-3">User not found.</div>;
  }

  const currentTime = new Date();

  const hasSubscription = user?.subscribedUpto
    ? new Date(user.subscribedUpto) > currentTime
    : false;

  const styleDate = (date) => format(new Date(date), 'MMMM d, yyyy, hh:mm a');

  const handleClick = () => {
    router.push('/subscribe');
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20">
      <div>
        <Image
          src={user?.image || '/default.jpg'}
          alt="user-photo"
          width={100}
          height={100}
          className="rounded-full h-24 w-24"
        />
      </div>
      <div className="text-center mt-3 text-md md:text-lg">
        <div className="uppercase">{user?.name}</div>
        <div>Email : {user?.email}</div>
        <div>
          Subscription :{' '}
          {hasSubscription ? (
            styleDate(user.subscribedUpto)
          ) : (
            <button
              onClick={handleClick}
              className="px-2 py-1 bg-accent-50 rounded-md text-sm"
            >
              Subscribe
            </button>
          )}
        </div>

        {user.role === 'admin' && (
          <div className="mt-5">
            <Button onClick={() => router.push('/adminPanel/dashboard')}>
              Admin Panel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
