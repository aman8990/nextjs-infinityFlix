'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import SpinnerMini from '@/app/_components/SpinnerMini';
import dynamic from 'next/dynamic';
import Textarea from '@/app/_components/Textarea';
import Spinner from '@/app/_components/Spinner';
import { IoClose } from 'react-icons/io5';

function CreateEpisode() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      season: '',
      episodeNumber: '',
      movieId: '',
      description: '',
      thumbnailUrl: '',
      videoUrl: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axios.post('/api/createEpisode', data);

      toast.dismiss();
      toast.success(`Episode Created with ID - ${res.data.id}`);

      reset();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data || 'Error in creating Movie');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="mt-10 mb-32 border-2 border-primary-700 max-w-lg
      w-full mx-auto rounded-lg"
      >
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl md:text-4xl mb-8">Create New Episode</h1>
          <div className="w-full px-6 md:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Title"
                id="title"
                type="text"
                placeholder="Iron Man"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Movie ID"
                id="movieId"
                type="text"
                placeholder="66e2bc9de4ecf4e5904e7310"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Season No"
                id="season"
                type="number"
                placeholder="10"
                errors={errors}
                register={register}
                disabled={isLoading}
              />

              <Input
                label="Episode No"
                id="episodeNumber"
                type="number"
                placeholder="5"
                errors={errors}
                register={register}
                disabled={isLoading}
              />

              <Textarea
                label="Description"
                id="description"
                type="text"
                placeholder="After being held captive in an Afghan cave, billionaire engineer Tony …"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Thumbnail URL"
                id="thumbnailUrl"
                type="url"
                placeholder="https://aman8950.github.io/videos/Iron-Man-1/Iron-Man-1.webp"
                errors={errors}
                register={register}
                disabled={isLoading}
                validationRules={{
                  required: '* This field is required',
                }}
              />

              <Input
                label="Video URL"
                id="videoUrl"
                type="url"
                placeholder="https://aman8950.github.io/videos/Iron-Man-1/master.m3u8"
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
    </>
  );
}

export default dynamic(() => Promise.resolve(CreateEpisode), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center mt-[20rem] h-full">
      <Spinner size={80} />
    </div>
  ),
});
