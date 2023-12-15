import Link from 'next/link';
import React from 'react';

const EditCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  return (
    <button className='btn btn-primary'>
      <Link href={`/categories/${categorySlug}/edit`}>Edit</Link>
    </button>
  );
};

export default EditCategoryButton;
