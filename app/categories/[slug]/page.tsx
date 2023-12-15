import prisma from '@/prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: { slug: string };
}

const CategoryDetailPage = async ({ params }: Props) => {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });
  if (!category) notFound();

  return (
    <div className='flex flex-row'>
      <div className='basis-3/4'>
        <h1>{category.title} posts</h1>
        <p>{category.slug}</p>
      </div>
      <div className='basis-1/4'>
        <button className='btn btn-primary'>
          <Link href={`/categories/${category.slug}/edit`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
