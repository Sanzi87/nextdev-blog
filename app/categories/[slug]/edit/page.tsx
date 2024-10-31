import React from 'react';
import CategoryForm from '../../_components/CategoryForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditCategoryPage = async (props: Props) => {
  const params = await props.params;
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) notFound();

  return <CategoryForm category={category} />;
};

export default EditCategoryPage;

export const metadata: Metadata = {
  title: 'Edit category - NextDev Solutions',
  description: 'Edit category - NextDev Solutions',
};
