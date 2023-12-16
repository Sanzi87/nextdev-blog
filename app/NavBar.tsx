'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
  ];
  return (
    <nav className='space-x-6 border-b mb-5 px-5 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <Link href='/'>
              <AiFillBug />
            </Link>
          </div>
          <div className='flex items-center'>
            <ul className='navbar-links flex space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
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
          <div>
            {status === 'authenticated' && (
              // <Link href='/api/auth/signout'>Log out</Link>
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role='button' className=''>
                  <div className='avatar'>
                    <div className='w-10 rounded-full ring ring-offset-base-100 ring-offset-2'>
                      <img src={session.user!.image!} />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52 text-center'
                >
                  <li className='pb-3'>{session.user!.name}</li>
                  <li>
                    <Link
                      className='justify-center py-3'
                      href='/api/auth/signout'
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Log in</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
