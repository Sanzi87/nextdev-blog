import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';
import EditCategoryButton from './[slug]/EditCategoryButton';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { Metadata } from 'next';
import authOptions from '../auth/authOptions';

interface Category {
  id: number;
  title: string;
  slug: string;
  desc: string;
  img: string;
}

const CategoriesPage = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === 'NEXTADMIN';

  const categories = (
    await prisma.category.findMany({
      orderBy: {
        title: 'asc',
      },
    })
  ).map((category) => ({
    ...category,
    id: category.id.toString(),
  }));

  return (
    <div className=''>
      {isAdmin && (
        <div className='mb-5 flex justify-center p-5 m-10'>
          <Link href='/categories/new'>
            <button className='rounded-md btn btn-primary p-4'>
              New Category
            </button>
          </Link>
        </div>
      )}

      <h1 className='text-center'>Categories</h1>
      <div className='flex flex-wrap justify-center mt-10'>
        {categories.map((category) => (
          <div className='rounded-[16px] w-96 card-glass m-4' key={category.id}>
            <figure>
              <Link href={`/posts?category=${category.slug}`}>
                <Image
                  className='rounded-t-[16px]'
                  alt={category.title}
                  width={384}
                  height={192}
                  style={{ maxWidth: '100%', height: 'auto' }}
                  src={`/nextdev-images/${category.img}`}
                />
              </Link>
            </figure>
            <div className='card-body'>
              <h2 className='card-title justify-center'>
                <Link href={`/posts?category=${category.slug}`}>
                  {category.title}
                </Link>
              </h2>
              <p className='text-center'>{category.desc}</p>
              {isAdmin && (
                <div className='card-actions justify-center'>
                  <EditCategoryButton categorySlug={category.slug} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

export const metadata: Metadata = {
  title: 'Explore Web Development Categories at NextDev Solutions',
  description:
    'Browse through diverse web development categories at NextDev Solutions. From HTML and CSS to JavaScript, React, Next JS, PHP, Python, and more, find insights, tips in every category.',
};
