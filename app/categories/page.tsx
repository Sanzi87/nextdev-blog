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
      <button className='btn btn-success'>
        <Link href='/categories/new'>New Category</Link>
      </button>
      <div>
        {categories.map((category) => (
          <div key={category.id}>{category.title}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
