import getUserQueries from '@/app/_actions/getUserQueries';
import UserQueriesData from './_components/UserQueriesData';

async function Page() {
  const userQueries = await getUserQueries();

  return (
    <div className="mt-32">
      <UserQueriesData userQueries={userQueries} />
    </div>
  );
}

export default Page;
