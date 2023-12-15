import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import EditCategoryButton from './EditCategoryButton';
import CategoryPosts from '../categoryPosts';

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
        <CategoryPosts category={category} />
      </div>
      <div className='basis-1/4'>
        <EditCategoryButton categorySlug={category.slug} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
