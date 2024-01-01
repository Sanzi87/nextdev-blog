import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';
import EditCategoryButton from './[slug]/EditCategoryButton';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  email: string;
}

const CategoriesPage = async () => {
  const session = await getServerSession(authOptions);
  const categories = await prisma.category.findMany({
    orderBy: {
      title: 'asc',
    },
  });

  return (
    <div>
      <div className='mb-5'>
        {session && (
          <button className='rounded-md btn btn-primary p-0'>
            <Link className='w-full p-4' href='/categories/new'>
              New Category
            </Link>
          </button>
        )}
      </div>
      <div className='flex flex-wrap justify-center mt-10'>
        {categories.map((category) => (
          <div className='rounded-[16px] w-96 card-glass m-4' key={category.id}>
            <figure>
              <Link href={`/posts?category=${category.slug}`}>
                <Image
                  className='rounded-[16px]'
                  alt={category.slug}
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
              <div className='card-actions justify-center'>
                {session && (
                  <>
                    <EditCategoryButton categorySlug={category.slug} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default CategoriesPage;
