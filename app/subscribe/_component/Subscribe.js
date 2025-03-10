'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

function Subscribe({ hasSubscription }) {
  const { status, data } = useSession();
  const router = useRouter();
  const email = data?.user?.email;

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (status === 'authenticated') {
      setLoading(true);
      try {
        const res = await axios.post('/api/checkout', {
          userEmail: email,
        });

        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          console.error('Error:', res.data.error);
        }
      } catch (error) {
        console.error('Checkout error:', error);
      }
      setLoading(false);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2 mt-10">
      <div className="w-full flex justify-center mb-5">
        <h1 className="text-2xl md:text-3xl text-center max-w-2xl">
          Subscribe to watch all content on Infinity Flix
        </h1>
      </div>

      <div className="w-full flex justify-center">
        <div className="border-2 border-gray-900 max-w-[80rem] w-full rounded-md">
          <h1 className="text-center text-xl p-2 bg-accent-50 m-2 rounded-md">
            Standard 1080
          </h1>

          <table className="w-full border-collapse border-t-2 border-gray-900">
            <tbody>
              <tr className="border-b-2 border-gray-900">
                <td className="py-2 px-2 md:px-10 font-semibold border-r-2 border-gray-900">
                  Monthly Price
                </td>
                <td className="py-2 px-2 md:px-10">$10.00</td>
              </tr>
              <tr className="border-b-2 border-gray-900">
                <td className="py-2 px-2 md:px-10 font-semibold border-r-2 border-gray-900">
                  Video and Sound Quality
                </td>
                <td className="py-2 px-2 md:px-10">Great</td>
              </tr>
              <tr className="border-b-2 border-gray-900">
                <td className="py-2 px-2 md:px-10 font-semibold border-r-2 border-gray-900">
                  Resolution
                </td>
                <td className="py-2 px-2 md:px-10">1080p (Full HD)</td>
              </tr>
              <tr className="border-b-2 border-gray-900">
                <td className="py-2 px-2 md:px-10 font-semibold border-r-2 border-gray-900">
                  Supported Devices
                </td>
                <td className="py-2 px-2 md:px-10">
                  TV, Computer, Mobile Phone, Tablet
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-10 font-semibold border-r-2 border-gray-900">
                  Devices can watch at the same time
                </td>
                <td className="py-2 px-2 md:px-10">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className={`flex items-center text-xl mt-5 py-1 pl-2.5 pr-1 rounded-md ${
          hasSubscription
            ? 'bg-gray-900 cursor-not-allowed'
            : 'bg-accent-50 cursor-pointer'
        }`}
      >
        <span>Continue</span>
        <IoIosArrowForward size={25} />
      </button>
    </div>
  );
}

export default Subscribe;
