import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import FormattedDate from '../components/FormatedDate';

const SinglePost = ({ post }: { post: Post }) => {
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
      <p>
        <FormattedDate ufdate={post.createdAt} />
      </p>
      <ReactMarkdown className='nextpost'>{post.desc}</ReactMarkdown>
    </>
  );
};

export default SinglePost;
