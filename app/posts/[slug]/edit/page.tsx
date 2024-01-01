import React from 'react';
import PostForm from '../../_components/PostForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

const EditPostPage = async ({ params }: Props) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) notFound();

  return <PostForm post={post} />;
};

export const metadata: Metadata = {
  title: 'Edit new post - NextDev Solutions',
  description: 'Edit new post - NextDev Solutions',
};

export default EditPostPage;
