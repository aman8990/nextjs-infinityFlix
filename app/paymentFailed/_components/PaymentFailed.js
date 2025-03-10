'use client';

import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';

function PaymentFailed() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-accent-50 mt-20 text-center text-3xl">
        Payment Failed
      </h1>
      <div className="w-28 flex mx-auto mt-6">
        <Button
          onClick={() => {
            router.push('/');
          }}
        >
          Go to home
        </Button>
      </div>
    </div>
  );
}

export default PaymentFailed;
