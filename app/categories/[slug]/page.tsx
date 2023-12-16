import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import EditCategoryButton from './EditCategoryButton';
import CategoryPosts from '../CategoryPosts';
import DeleteCategoryButton from './DeleteCategoryButton';

interface Props {
  params: { slug: string };
}

const CategoryDetailPage = async ({ params }: Props) => {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });
  if (!category) notFound();

  return (
    <div className='flex flex-col md:flex-row'>
      <div className=' md:basis-3/4 lg:basis-4/5 p-3'>
        <CategoryPosts category={category} />
      </div>
      <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
        <EditCategoryButton categorySlug={category.slug} />
        <DeleteCategoryButton categorySlug={category.slug} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
