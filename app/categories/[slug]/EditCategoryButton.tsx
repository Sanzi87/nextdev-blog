import Link from 'next/link';
import React from 'react';

const EditCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  return (
    <Link
      href={`/categories/${categorySlug}/edit`}
      className='btn btn-primary w-full p-4 text-center'
    >
      Edit
    </Link>
  );
};

export default EditCategoryButton;
