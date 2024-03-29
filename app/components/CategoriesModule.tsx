import prisma from '@/prisma/client';
import Link from 'next/link';
import React from 'react';

const CategoriesModule = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div>
      <h2 className='mt-1 mb-1 text-center'>Categories</h2>
      <div className='flex flex-wrap flex-col justify-center m-5'>
        <div className='flex justify-center align-items  p-4 bg-slate-800 mb-5'>
          <h3 className='mb-0 mt-0 hover:text-white'>
            <Link href={`/posts`}>All</Link>
          </h3>
        </div>
        {categories.map((category) => (
          <div
            key={category.slug}
            className='flex justify-center align-items  p-4 bg-slate-800 mb-5'
          >
            <h3 className='mb-0 mt-0 hover:text-white'>
              <Link href={`/posts?category=${category.slug}`}>
                {category.title}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesModule;
