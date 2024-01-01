import React from 'react';
import PostForm from '../_components/PostForm';
import { Metadata } from 'next';

const NewPostPage = () => {
  return <PostForm />;
};

export default NewPostPage;

export const metadata: Metadata = {
  title: 'Add new post - NextDev Solutions',
  description: 'Add new post - NextDev Solutions',
};
