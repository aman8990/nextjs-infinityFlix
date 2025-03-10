import getCurrentUser from '../_actions/getCurrentUser';
import UserInfo from './_components/UserInfo';

async function UserLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <div className="fixed top-14 md:top-16 inset-0 pb-24 overflow-y-scroll scrollbar-none">
      <UserInfo user={user} />
      <div className="overflow-y-auto scrollbar-none">{children}</div>
    </div>
  );
}

export default UserLayout;
