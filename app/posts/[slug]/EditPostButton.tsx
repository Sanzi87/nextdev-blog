import Link from 'next/link';
import React from 'react';

const EditPostButton = ({ postSlug }: { postSlug: string }) => {
  return (
    <button className='btn btn-primary p-0'>
      <Link className='w-full p-4' href={`/posts/${postSlug}/edit`}>
        Edit
      </Link>
    </button>
  );
};

export default EditPostButton;
