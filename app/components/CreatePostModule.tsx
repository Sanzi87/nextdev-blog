import React from 'react';
import Link from 'next/link';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';

const CreatePostModule = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='mb-5 text-center'>
      {session?.user.role === 'NEXTADMIN' && (
        <button className='btn btn-primary p-0'>
          <Link className='w-full p-4' href='/posts/new'>
            CREATE POST
          </Link>
        </button>
      )}
    </div>
  );
};

export default CreatePostModule;
