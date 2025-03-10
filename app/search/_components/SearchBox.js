'use client';

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Spinner from '@/app/_components/Spinner';
import SearchedMovie from './SearchedMovie';

function SearchBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/searchMovie', data);

      setError(false);
      setMovies(res.data);
      setShowError(true);
    } catch (error) {
      setMovies(null);
      setError(true);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full mt-14 mb-20 h-full">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 text-3xl text-center font-semibold text-accent-1000">
          Search
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 w-full max-w-[60rem]"
        >
          <Input
            label="Movie Ttile"
            id="title"
            type="text"
            placeholder="Iron Man"
            roundedFull
            errors={errors}
            register={register}
            disabled={isLoading}
            validationRules={{
              required: '* This field is required',
              validate: (value) =>
                value.trim() !== '' || '* This feild cannot be empty spaces',
              minLength: {
                value: 2,
                message: '* Password needs a minimum of 8 characters',
              },
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button type="submit" rounded>
              Submit
            </Button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-20">
          <SpinnerMini />
        </div>
      ) : (
        <div className="flex justify-center mt-10 pb-32">
          <div
            className={`grid gap-2 md:gap-3 overflow-y-scroll scrollbar-none scroll-smooth ${
              !movies?.length
                ? 'hidden'
                : movies?.length === 1
                ? 'grid-cols-1 place-items-center'
                : movies?.length === 2
                ? 'grid grid-cols-1 sm:grid-cols-2 place-items-center'
                : movies?.length === 3
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center'
                : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {movies.length !== 0 &&
              movies?.map((movie) => (
                <SearchedMovie movie={movie} key={movie.id} />
              ))}
          </div>
          {(showError && error) ||
            (showError && movies?.length === 0 && (
              <h1 className="text-center mt-20 text-xl">No Movie Found</h1>
            ))}
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(SearchBox), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center">
      <Spinner size={80} />
    </div>
  ),
});
