import Link from 'next/link';
import React from 'react';

const EditCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  return (
    <button className='btn btn-primary p-0'>
      <Link className='w-full p-4' href={`/categories/${categorySlug}/edit`}>
        Edit
      </Link>
    </button>
  );
};

export default EditCategoryButton;
