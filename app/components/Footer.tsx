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
    <div className='flex flex-col gap-2'>
      <h2>{header}</h2>
      <ul className=''>
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
              <h2 className=''>NextDev Solutions</h2>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            fuga error dolore totam delectus mollitia ipsam quaerat. Adipisci,
            asperiores unde! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Impedit fuga error dolore totam delectus mollitia ipsam
            quaerat. Adipisci, asperiores unde!
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
