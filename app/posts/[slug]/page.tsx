import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import EditPostButton from './EditPostButton';
import SinglePost from '../SinglePost';
import DeletePostButton from './DeletePostButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import CategoriesModule from '@/app/components/CategoriesModule';

interface Props {
  params: { slug: string };
}

const PostDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  if (!post) notFound();

  return (
    <div className='flex flex-col md:flex-row'>
      <article className='md:basis-3/4 lg:basis-4/5 p-3'>
        <SinglePost post={post} />
      </article>

      <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
        {session && (
          <>
            <EditPostButton postSlug={post.slug} />
            <DeletePostButton postSlug={post.slug} />
          </>
        )}
        <CategoriesModule />
      </div>
    </div>
  );
};

export default PostDetailPage;
