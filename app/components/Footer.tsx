'use client';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];
const socialLinks = [
  { label: 'Youtube', href: 'https://youtube.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
];

interface FooterNavProps {
  header: string;
  blank?: boolean;
  links: {
    label: string;
    href: string;
  }[];
}

const FooterNavLinks = ({ links, header, blank = false }: FooterNavProps) => {
  const currentPath = usePathname();
  return (
    <div className='flex flex-col gap-2 mx-5'>
      <h2 className='my-0'>{header}</h2>
      <ul className='text-2xl  leading-10 md:text-xl md:leading-8'>
        {links.map((link) => (
          <li key={link.href} className='hover:text-white'>
            <Link
              className={classnames({
                'active-link': link.href === currentPath,
                'transition-colors': true,
              })}
              href={link.href}
              target={blank ? '_blank' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='bg-neutral p-10'>
      <div className='container mx-auto flex flex-col text-center md:flex-row  md:text-left justify-between gap-3'>
        <div className='flex flex-col gap-3 md:basis-3/5 lg:basis-4/6'>
          <div className='flex gap-3'>
            <div className='flex items-center'>
              <Image
                alt='NextDev Solutions Logo'
                width={100}
                height={100}
                style={{ maxWidth: '50px', height: 'auto' }}
                src={'/NextDev-logo-xs.webp'}
              />
            </div>
            <div className='flex items-center'>
              <h2 className='my-0'>NextDev Solutions</h2>
            </div>
          </div>
          <p className='text-justify'>
            Discover the nuances of web development with NextDev Solutions, your
            hub for insights into HTML, CSS, JavaScript, TypeScript, PHP,
            Python, React, Next JS, and Django. Uncover the secrets of various
            technologies through comprehensive blog posts, practical tips, and
            hands-on code demos. Join us on a dynamic journey through the realms
            of Next JS, React, and JavaScript, as we explore and evolve in the
            ever-changing world of web development.
          </p>
        </div>
        <div className='md:basis-1/5 lg:basis-1/6'>
          <FooterNavLinks links={footerLinks} header='Links' />
        </div>
        <div className='md:basis-1/5 lg:basis-1/6'>
          <FooterNavLinks links={socialLinks} header={'Social'} blank={true} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
