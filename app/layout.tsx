import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextDev Solutions',
  description: 'NextDev Solutions Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <NavBar />
            <main className='container mx-auto p-5'>{children}</main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
