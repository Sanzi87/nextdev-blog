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
          <div>
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
              <Link href='/api/auth/signout'>Log out</Link>
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
