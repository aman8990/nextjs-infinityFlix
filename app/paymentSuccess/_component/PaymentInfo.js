import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';

function PaymentInfo({ paymentDetails }) {
  const router = useRouter();

  return (
    <div className="mx-2 mb-32">
      <h1 className="text-green-500 text-center mb-5 mt-10 text-3xl">
        Payment Success
      </h1>
      <div className="border-2 border-gray-900 rounded-md space-y-2 text-lg md:text-xl max-w-[40rem] mx-auto px-5 py-5 break-words">
        <h1>Payment Id : {paymentDetails?.payment_intent}</h1>
        <h1>Amount : ${paymentDetails?.amount_total / 100}</h1>
        <h1>Email : {paymentDetails?.customer_email}</h1>
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
    </div>
  );
}

export default PaymentInfo;
