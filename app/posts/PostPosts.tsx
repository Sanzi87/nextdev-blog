import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const PostPosts = ({ post }: { post: Post }) => {
  return (
    <>
      <Image
        alt={post.slug}
        width={1920}
        height={1080}
        style={{ maxWidth: '100%', height: 'auto' }}
        src={`/nextdev-images/${post.img}`}
      />
      <h1>{post.title}</h1>
      {post.desc}
    </>
  );
};

export default PostPosts;
