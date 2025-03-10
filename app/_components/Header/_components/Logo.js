import { useRouter } from 'next/navigation';
import { GiOverInfinity } from 'react-icons/gi';

function Logo() {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center space-x-1 p-2"
      onClick={() => router.push('/')}
    >
      <span className="flex items-center">
        <GiOverInfinity className="text-accent-50 text-5xl md:text-6xl" />
      </span>
      <span className="top-[2px] text-2xl md:text-3xl relative font-bold text-accent-50">
        Infinity Flix
      </span>
    </div>
  );
}

export default Logo;
