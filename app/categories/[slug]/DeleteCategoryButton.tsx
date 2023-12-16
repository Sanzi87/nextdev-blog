import Link from 'next/link';
import React from 'react';

const DeleteCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  return (
    <button className='btn btn-error'>
      <Link href={`/categories/${categorySlug}/edit`}>Delete</Link>
    </button>
  );
};

export default DeleteCategoryButton;
