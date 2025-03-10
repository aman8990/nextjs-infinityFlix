'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import dynamic from 'next/dynamic';
import Spinner from '@/app/_components/Spinner';
import UpdateMovie from './UpdateMovie';

function MovieForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axios.post('/api/movieDetails', data);

      setMovie(null);

      setTimeout(() => {
        setMovie({ ...res.data });
      }, 10);

      toast.dismiss();
      toast.success('Movie Fetched');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data || 'Error in fetching movie details');
      setMovie(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="mt-10 mb-10 border-2 border-primary-700 max-w-lg
      w-full mx-auto rounded-lg"
      >
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl md:text-4xl mb-8">Movie Details</h1>
          <div className="w-full px-6 md:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Movie ID"
                id="id"
                type="text"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <div className="flex justify-center">
                <Button type="submit">
                  {isLoading ? <SpinnerMini /> : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {movie && <UpdateMovie movie={movie} setMovie={setMovie} />}
    </>
  );
}

export default dynamic(() => Promise.resolve(MovieForm), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center mt-[20rem] h-full">
      <Spinner size={80} />
    </div>
  ),
});
