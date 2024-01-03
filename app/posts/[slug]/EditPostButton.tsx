import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const EditPostButton = async ({ postSlug }: { postSlug: string }) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user.role === 'NEXTADMIN' && (
        <button className='btn btn-primary p-0'>
          <Link className='w-full p-4' href={`/posts/${postSlug}/edit`}>
            Edit
          </Link>
        </button>
      )}
    </>
  );
};

export default EditPostButton;
