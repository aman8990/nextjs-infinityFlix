import useSWR from 'swr';
import fetcher from '../_libs/fetcher';

export default function usePayments(page = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/userPayments?page=${page}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      staleTime: 10 * 60 * 1000,
      dedupingInterval: 60000,
      errorRetryCount: 1,
    }
  );

  return { data, error, isLoading, mutate };
}
