import React from 'react';
import PostForm from '../../_components/PostForm';
import prisma from '@/prisma/client';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditPostPage = async (props: Props) => {
  const params = await props.params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'NEXTADMIN') {
    redirect('/');
  }

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
