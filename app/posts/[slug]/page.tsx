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
  params: Promise<{ slug: string }>;
}

const PostDetailPage = async (props: Props) => {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === 'NEXTADMIN';

  let post;
  try {
    post = await prisma.post.findUnique({
      where: { slug: params.slug },
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }

  if (!post) notFound();

  return (
    <div className='flex flex-col md:flex-row'>
      <article className='md:basis-3/4 lg:basis-4/5 p-3'>
        <SinglePost post={post} />
      </article>

      <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
        {isAdmin && (
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
export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  return {
    title: post?.title + ' - NextDev Solutions',
    description: post?.short,
  };
}

export default PostDetailPage;
