import { Post } from '@prisma/client';
import React from 'react';

const PostPosts = ({ post }: { post: Post }) => {
  return (
    <>
      <h1>{post.title} posts</h1>
      <p>{post.slug}</p>
    </>
  );
};

export default PostPosts;
