import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import FormattedDate from '../components/FormatedDate';
import MarkdownBlock from './_components/MarkdownBlock';

interface PostWithUser extends Post {
  user: { name: string | null };
}

const SinglePost = ({ post }: { post: PostWithUser }) => {
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
      <div className='flex justify-between'>
        <time className='text-sm text-gray-500'>
          Date: <FormattedDate ufdate={post.createdAt} />
        </time>
        <small className='text-sm text-gray-500'>
          Author: {post.user.name}
        </small>
      </div>
      <div className='nextpost'>
        <MarkdownBlock>{post.desc}</MarkdownBlock>
      </div>
    </>
  );
};

export default SinglePost;
