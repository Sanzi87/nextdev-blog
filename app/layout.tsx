import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';

const lato = Lato({ weight: '400', subsets: ['latin'] });

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
      <body className={lato.className}>
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
