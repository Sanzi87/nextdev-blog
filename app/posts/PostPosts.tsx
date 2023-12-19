import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostPosts = ({ post }: { post: Post }) => {
  const publishedDate = new Intl.DateTimeFormat('se-SV', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(post.createdAt));

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
      <p>{publishedDate}</p>
      <ReactMarkdown className='nextpost'>{post.desc}</ReactMarkdown>
    </>
  );
};

export default PostPosts;
