import { Category } from '@prisma/client';
import React from 'react';

const CategoryPosts = ({ category }: { category: Category }) => {
  return (
    <>
      <h1>{category.title} posts</h1>
      <p>{category.slug}</p>
    </>
  );
};

export default CategoryPosts;
