import prisma from '@/prisma/client';
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
    <div>
      <h1>{category.title} posts</h1>
      <p>{category.slug}</p>
    </div>
  );
};

export default CategoryDetailPage;
