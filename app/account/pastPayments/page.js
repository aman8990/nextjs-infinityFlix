'use client';

import Spinner from '@/app/_components/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePayments from '@/app/_hooks/usePayments';
import UserPayment from '../_components/UserPayment';

function Page() {
  const [page, setPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageData, setNextPageData] = useState([]);
  const { data, error, isLoading } = usePayments();
  const { data: nextPageOrders } = usePayments(page + 1);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setPayments(data);
    }
  }, [data]);

  useEffect(() => {
    if (nextPageOrders) {
      if (nextPageOrders.length > 0) {
        setNextPageData(nextPageOrders);
      } else {
        setHasMore(false);
      }
    }
  }, [nextPageOrders]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
    setPayments((prevOrders) => [...prevOrders, ...nextPageData]);
    setNextPageData([]);
  };

  if (isLoading && page === 1)
    return (
      <div className="w-full h-full flex justify-center mt-5">
        <Spinner size={80} />
      </div>
    );
  if (error || payments.length === 0)
    return (
      <div className="flex justify-center flex-col items-center mt-20">
        <h1 className="p-4 text-3xl border-2 border-white rounded-md max-w-2xl">
          No Payments found
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 mt-4 text-lg text-white bg-accent-50 rounded-md"
        >
          Go back
        </button>
      </div>
    );

  return (
    <div className="flex justify-center mb-32 md:mb-20">
      <div className="max-w-4xl space-y-5 md:space-y-10">
        <h1 className="text-center mt-10 text-3xl">Your Payments</h1>
        {payments.map((payment) => (
          <UserPayment payment={payment} key={payment.id} />
        ))}

        {hasMore && (
          <div className="flex justify-center mt-5">
            <button
              onClick={handleViewMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
