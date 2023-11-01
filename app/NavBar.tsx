'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Next JS', href: '/next-js' },
    { label: 'React JS', href: '/react-js' },
    { label: 'TypeScript', href: '/typescript' },
    { label: 'JavaScript', href: '/javascript' },
    { label: 'HTML & CSS', href: '/html-css' },
    { label: 'Django', href: '/django' },
    { label: 'Python', href: '/python' },
    { label: 'PHP', href: '/php' },
    { label: 'Git', href: '/git' },
    { label: 'Joomla', href: '/joomla' },
    { label: 'WordPress', href: '/wordpress' },
  ];
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='navbar-links flex space-x-6'>
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              'active-link': link.href === currentPath,
              'transition-colors': true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
