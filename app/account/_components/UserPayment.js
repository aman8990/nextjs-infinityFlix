import { format } from 'date-fns';

function UserPayment({ payment }) {
  const styleDate = (date) => format(new Date(date), 'MMMM d, yyyy, hh:mm a');

  return (
    <div className="space-y-4 border-2 border-white p-2 rounded-md text-sm md:text-lg">
      <div className="flex justify-between gap-2 sm:gap-[10rem] lg:gap-[20rem] border-b border-white">
        <h1>User Payment Id : {payment.id}</h1>
      </div>

      <div>
        <h1>
          Total Price : <span className="text-red-500">${payment.amount}</span>
        </h1>
        <h1>Payment Intent Id : {payment.paymentId}</h1>
        <h1>Date : {styleDate(payment.createdAt)}</h1>
      </div>
    </div>
  );
}

export default UserPayment;
