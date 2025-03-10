import Spinner from './_components/Spinner';

export default function Loading() {
  return (
    <div className="absolute flex justify-center items-center w-full h-full">
      <Spinner size={80} />
    </div>
  );
}
