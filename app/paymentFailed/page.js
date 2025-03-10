import PaymentFailed from './_components/PaymentFailed';

function Page() {
  return (
    <div className="fixed top-20 md:top-32 inset-0 overflow-y-scroll scrollbar-none">
      <PaymentFailed />
    </div>
  );
}

export default Page;
