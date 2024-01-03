import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import FormattedDate from '../components/FormatedDate';
import MarkdownBlock from './_components/MarkdownBlock';

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
      <div className='nextpost'>
        <MarkdownBlock>{post.desc}</MarkdownBlock>
      </div>
    </>
  );
};

export default SinglePost;
