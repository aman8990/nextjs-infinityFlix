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

function UpdateMovie({ movie, setMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setcategories] = useState(movie.categories);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: movie.title,
      description: movie.description,
      thumbnailUrl: movie.thumbnailUrl,
      videoUrl: movie.videoUrl,
      isSeries: movie.isSeries,
      category: '',
      episodeId: movie.episodeId,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const updatedData = {};
      const isSeriesBool = data.isSeries === 'true';

      if (data.title !== movie.title) updatedData.title = data.title;
      if (data.description !== movie.description)
        updatedData.description = data.description;
      if (data.thumbnailUrl !== movie.thumbnailUrl)
        updatedData.thumbnailUrl = data.thumbnailUrl;
      if (data.videoUrl !== movie.videoUrl)
        updatedData.videoUrl = data.videoUrl;
      if (isSeriesBool !== movie.isSeries) {
        updatedData.isSeries = isSeriesBool;
      }
      if (data.episodeId !== movie.episodeId)
        updatedData.episodeId = data.episodeId;

      if (JSON.stringify(categories) !== JSON.stringify(movie.categories)) {
        updatedData.categories = categories;
      }

      if (Object.keys(updatedData).length === 0) {
        toast.dismiss();
        toast.error('No changes detected.');
        setIsLoading(false);
        return;
      }

      const finalData = { updatedData, id: movie.id };

      const res = await axios.post('/api/updateMovie', finalData);

      setMovie(res.data);
      toast.dismiss();
      toast.success(`Movie Updated`);
    } catch (error) {
      toast.dismiss();
      toast.error('Error in Updating Movie');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = () => {
    const categoryValue = getValues('category');
    if (categoryValue.trim() !== '') {
      setcategories((prev) => [...prev, categoryValue]);
      setValue('category', '');
    }
  };

  const handleRemoveCategory = (cat) => {
    setcategories((prev) => prev.filter((item) => item !== cat));
  };

  return (
    <>
      <div
        className="mt-10 mb-32 border-2 border-primary-700 max-w-lg
      w-full mx-auto rounded-lg"
      >
        <div className="flex items-center flex-col my-10">
          <h1 className="text-3xl md:text-4xl mb-8">Update Movie</h1>
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

              <div className="flex flex-col">
                <label htmlFor="isSeries" className="text-lg font-medium">
                  Is Series
                </label>
                <select
                  id="isSeries"
                  className="text-black w-full h-8 mt-1 pl-1 font-semibold rounded-md"
                  {...register('isSeries', {
                    required: '* This field is required',
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-grow">
                  <Input
                    label="Category"
                    id="category"
                    type="text"
                    placeholder="marvel"
                    errors={errors}
                    register={register}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleAddCategory}
                  type="button"
                  className="bg-accent-50 h-9 px-4 rounded-md"
                >
                  Add
                </button>
              </div>

              <ul className="mt-2">
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    className="text-md bg-gray-200 text-black p-1 rounded-md inline-block mr-2 space-x-2"
                  >
                    <span>{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                    >
                      <IoClose size={20} />
                    </button>
                  </li>
                ))}
              </ul>

              {movie.isSeries && (
                <Input
                  label="Episode ID"
                  id="episodeId"
                  type="text"
                  placeholder="66e2bc9de4ecf4e5904e7311"
                  errors={errors}
                  register={register}
                  disabled={isLoading}
                />
              )}

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

export default dynamic(() => Promise.resolve(UpdateMovie), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center mt-[20rem] h-full">
      <Spinner size={80} />
    </div>
  ),
});
