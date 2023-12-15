import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  email: string;
}

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className='mb-5'>
        <button className='btn btn-primary'>
          <Link href='/categories/new'>New Category</Link>
        </button>
      </div>
      <div className='flex flex-wrap justify-center mt-10'>
        {categories.map((category) => (
          <div className='card w-96 glass m-4' key={category.id}>
            <figure>
              <Link href={`/categories/${category.slug}`}>
                <img
                  src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
                  alt='car!'
                />
              </Link>
            </figure>
            <div className='card-body'>
              <h2 className='card-title justify-center'>
                <Link href={`/categories/${category.slug}`}>
                  {category.title}
                </Link>
              </h2>
              <p className='text-center'>See all {category.title} posts.</p>
              <div className='card-actions justify-center'>
                <button className='btn btn-primary'>
                  <Link href={`/categories/${category.slug}/edit`}>Edit</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
