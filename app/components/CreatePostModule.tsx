import React from 'react';
import Link from 'next/link';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';

const CreatePostModule = async () => {
  try {
    const session = await getServerSession(authOptions);
    return (
      <div className='mb-5 text-center'>
        {session?.user.role === 'NEXTADMIN' && (
          <Link href='/posts/new'>
            <button className='btn btn-primary w-full p-4'>CREATE POST</button>
          </Link>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching session:', error);
    return (
      <div className='mb-5 text-center text-red-500'>
        Unable to verify admin permissions. Please try again later.
      </div>
    );
  }
};

export default CreatePostModule;
