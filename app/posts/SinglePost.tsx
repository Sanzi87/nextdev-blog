import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import FormattedDate from '../components/FormatedDate';
import MarkdownBlock from './_components/MarkdownBlock';

const SinglePost = ({ post }: { post: Post }) => {
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <>
      <Image
        alt={post.title}
        width={1920}
        height={1080}
        className='w-full h-auto mb-12'
        src={`/nextdev-images/${post.img}`}
      />
      <h1>{post.title}</h1>
      <time className='text-sm text-gray-500'>
        <FormattedDate ufdate={post.createdAt} />
      </time>
      <div className='nextpost'>
        <MarkdownBlock>{post.desc}</MarkdownBlock>
      </div>
    </>
  );
};

export default SinglePost;
