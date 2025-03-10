'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/app/_components/Spinner';
import PaymentInfo from './PaymentInfo';
import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';

function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `/api/paymentInfo?session_id=${sessionId}`
        );
        setPaymentDetails(data);
      } catch (error) {
        // console.error('Error fetching payment details:', error);
        toast.dismiss();
        toast.error('Error in Verifying Payment');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center flex-col h-full">
        <div>
          <Spinner size={80} />
        </div>
        <h1>Verifying your order</h1>
      </div>
    );

  if (!paymentDetails)
    return (
      <>
        <div className="flex justify-center text-xl sm:text-3xl mt-20 text-center">
          Error in verifying payment
        </div>
        <div className="w-28 flex mx-auto mt-6">
          <Button
            onClick={() => {
              router.push('/');
            }}
          >
            Go to home
          </Button>
        </div>
      </>
    );

  return (
    <div>
      <PaymentInfo paymentDetails={paymentDetails} />
    </div>
  );
}

export default Payment;
