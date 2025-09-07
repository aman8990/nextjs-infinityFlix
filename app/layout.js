import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/Header/Header';
import HeaderMobile from './_components/HeaderMobile/FooterMobile';
import AuthContext from './_context/AuthContext';
import ToasterContext from './_context/ToasterContext';
import { SpeedInsights } from '@vercel/speed-insights/react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Infinity Flix',
  description: 'Stream Your Favorite Movies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-red-50`}>
        <AuthContext>
          <ToasterContext />
          <SpeedInsights />
          <Header />
          <HeaderMobile />
          <div>{children}</div>
        </AuthContext>
      </body>
    </html>
  );
}
