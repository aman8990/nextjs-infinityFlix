import React, { useState } from 'react';
import Button from '@/app/_components/Button';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';

function UserQuery({ query, onRemove }) {
  const [isLoading, setIsLoading] = useState(false);
  const id = query?.id;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/deleteUserQuery', { id });

      toast.dismiss();
      toast.success('Query Deleted');
      onRemove(id);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Error in Deleting Query');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto border-2 rounded-md mb-5 p-3 md:p-6 md:text-lg space-y-3">
      <div>
        <div>
          <span className="text-gray-500">Query ID : </span> {query.id}
        </div>
        <div>
          <span className="text-gray-500">Name : </span>
          {query.name}
        </div>
        <div>
          <span className="text-gray-500">Email : </span>
          {query.email}
        </div>
        <div>
          <span className="text-gray-500">Subject :</span>
          {query.subject}
        </div>
        <div>
          <span className="text-gray-500">Description : </span>
          {query.description}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button color="red" onClick={() => handleClick()}>
          {isLoading ? <SpinnerMini /> : 'Delete'}
        </Button>
      </div>
    </div>
  );
}

export default UserQuery;
