'use client';

import Button from '@/app/_components/Button';
import UserQuery from './UserQuery';
import { useState } from 'react';

function UserQueriesData({ userQueries }) {
  const [data, setData] = useState(userQueries);

  const removeQuery = (id) => {
    setData((prev) => prev.filter((query) => query.id !== id));
  };

  if (data?.length === 0)
    return (
      <div className="flex items-center flex-col">
        <div className="text-center mt-48 text-3xl">No Queries Found</div>
        <div className="flex justify-center mt-5 w-32">
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );

  return (
    <div className="mb-32">
      <h1 className="text-center text-4xl my-10">User Queries</h1>

      <div>
        {data.map((query) => (
          <div key={query.id} className="bg-primary-950">
            <UserQuery query={query} onRemove={removeQuery} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserQueriesData;
