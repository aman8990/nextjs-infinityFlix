import getCurrentUser from '../_actions/getCurrentUser';
import Subscribe from './_component/Subscribe';

async function Page() {
  const currentUser = await getCurrentUser();
  const currentTime = new Date();

  const hasSubscription = currentUser?.subscribedUpto
    ? new Date(currentUser.subscribedUpto) > currentTime
    : false;

  return (
    <div className="fixed top-[4.5rem] md:top-[7rem] inset-0 pb-24 overflow-y-scroll scrollbar-none">
      <Subscribe hasSubscription={hasSubscription} />
    </div>
  );
}

export default Page;
