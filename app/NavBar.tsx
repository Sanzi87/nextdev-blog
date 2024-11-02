'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface MenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
}

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Disable scrolling when the mobile menu is open
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // Enable scrolling when the mobile menu is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Link href='/'>
            <Image
              alt={'NextDev Solutions Logo'}
              width={100}
              height={100}
              style={{ maxWidth: '50px', height: 'auto' }}
              src={`/NextDev-logo-xs.webp`}
            />
          </Link>
        </div>
        <DesktopMenu />
        <SocMedia />

        {/* Hamburger Menu - Mobile */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-white'>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu menuOpen={menuOpen} closeMenu={closeMenu} />
      </div>
    </nav>
  );
};

export default NavBar;

const DesktopMenu = () => {
  const { status } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
    { label: 'Contact', href: '/contact' },
  ];
  return (
    <div className='hidden md:flex items-center py-3'>
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

const MobileMenu = ({ menuOpen, closeMenu }: MenuProps) => {
  const { status } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <>
      {menuOpen && (
        <div className='md:hidden absolute top-0 left-0 h-screen w-full bg-gray-800 p-4  text-2xl'>
          <div className='flex flex-col items-center'>
            <div className='w-full flex flex-col items-end justify-end mb-5 mr-8'>
              <button
                onClick={closeMenu}
                className='text-white text-2xl mt-4 hover:text-gray-300'
              >
                X
              </button>
            </div>
            <div className='flex flex-col items-center'>
              <ul className='flex flex-col items-center justify-center space-y-4'>
                {links.map((link) => (
                  <li key={link.href} className=' text-2x hover:text-white'>
                    <Link
                      className={classnames({
                        'active-link': link.href === currentPath,
                        'transition-colors': true,
                      })}
                      href={link.href}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex space-x-4 my-8'>
              <Link
                target='_blank'
                href='https://youtube.com/@NextDevSolutions'
              >
                <AiFillYoutube className='text-3xl text-white hover:text-red-500 duration-500' />
              </Link>
              <Link
                target='_blank'
                href='https://instagram.com/nextdevsolutions'
              >
                <AiFillInstagram className='text-3xl text-white hover:text-fuchsia-800 duration-500' />
              </Link>
            </div>
            {status === 'authenticated' && (
              <div className='flex hover:text-white'>
                <Link href={'/api/auth/signout'} onClick={closeMenu}>
                  Log out
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const SocMedia = () => {
  const { status, data: session } = useSession();

  if (status === 'loading')
    return (
      <div className='hidden md:flex space-x-4 items-center py-3'>
        {status === 'loading' && (
          <>
            <Link target='_blank' href='https://youtube.com/@NextDevSolutions'>
              <AiFillYoutube className='text-3xl text-white hover:text-red-500' />
            </Link>
            <Link target='_blank' href='https://instagram.com/nextdevsolutions'>
              <AiFillInstagram className='text-3xl text-white hover:text-fuchsia-800' />
            </Link>
          </>
        )}
      </div>
    );

  if (status === 'unauthenticated')
    return (
      <div className='hidden md:flex space-x-4 items-center py-3'>
        {status === 'unauthenticated' && (
          <>
            <Link target='_blank' href='https://youtube.com/@NextDevSolutions'>
              <AiFillYoutube className='text-3xl text-white hover:text-red-500' />
            </Link>
            <Link target='_blank' href='https://instagram.com/nextdevsolutions'>
              <AiFillInstagram className='text-3xl text-white hover:text-fuchsia-800' />
            </Link>
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
              <img alt='User Avatar' src={session!.user!.image!} />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content z-[10000000] menu p-2 shadow bg-neutral rounded-box w-52 text-center'
        >
          <li className='pb-3 text-white font-bold text'>
            {session!.user!.name}
          </li>
          <li>
            <Link
              className='justify-center py-3'
              target='_blank'
              href='https://youtube.com/@NextDevSolutions'
            >
              NextDev Youtube
            </Link>
          </li>
          <li>
            <Link
              className='justify-center py-3'
              target='_blank'
              href='https://instagram.com/nextdevsolutions'
            >
              NextDev Istagram
            </Link>
          </li>
          <li>
            <Link className='justify-center py-3' href='/api/auth/signout'>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
