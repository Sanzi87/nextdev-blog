import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';

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
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>
      <body className={lato.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <QueryClientProvider>
          <AuthProvider>
            <NavBar />
            <main className='container min-h-screen mx-auto p-1 md:p-10'>
              {children}
            </main>
          </AuthProvider>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
