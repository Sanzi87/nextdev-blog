'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug, AiFillYoutube } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  return (
    <nav className='space-x-6 border-b mb-5 px-5 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <Link href='/'>
              <img
                alt={'NextDev Solutions Logo'}
                width={100}
                height={100}
                style={{ maxWidth: '50px', height: 'auto' }}
                src={`/NextDev-logo-xs.webp`}
              />
            </Link>
          </div>
          <NavLinks />
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
  ];
  return (
    <div className='flex items-center py-3'>
      <ul className='navbar-links flex space-x-6 text-xl'>
        {links.map((link) => (
          <li key={link.href} className='hover:text-white'>
            <Link
              className={classnames({
                'active-link': link.href === currentPath,
                'transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading')
    return (
      <div className='flex items-center py-3 w-10'>
        <Link target='_blank' href='https://youtube.com/@NextDevSolutions'>
          <AiFillYoutube className='text-lg' />
        </Link>
      </div>
    );

  if (status === 'unauthenticated')
    return (
      <div className='flex items-center py-3'>
        {status === 'unauthenticated' && (
          <>
            <Link target='_blank' href='https://youtube.com/@NextDevSolutions'>
              <AiFillYoutube className='text-3xl text-red-500' />
            </Link>
            <Link href='/api/auth/signin'>Log in</Link>
          </>
        )}
      </div>
    );

  return (
    <div>
      <div className='dropdown dropdown-end'>
        <div tabIndex={0} role='button' className='mt-1'>
          <div className='avatar'>
            <div className='w-10 rounded-full ring ring-offset-base-100 ring-offset-2'>
              <img src={session!.user!.image!} />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52 text-center'
        >
          <li className='pb-3'>{session!.user!.name}</li>
          <li>
            <Link
              className='justify-center py-3'
              target='_blank'
              href='https://youtube.com/@NextDevSolutions'
            >
              Youtube
            </Link>
            <Link className='justify-center py-3' href='/api/auth/signout'>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
