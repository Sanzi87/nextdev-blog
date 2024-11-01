import React from 'react';
import PostForm from '../_components/PostForm';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { redirect } from 'next/navigation';

const NewPostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'NEXTADMIN') {
    redirect('/');
  }

  return <PostForm />;
};

export default NewPostPage;

export const metadata: Metadata = {
  title: 'Add new post - NextDev Solutions',
  description: 'Add new post - NextDev Solutions',
};
