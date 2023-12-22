import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';
import EditPostButton from './[slug]/EditPostButton';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';
import CategoriesModule from '../components/CategoriesModule';
import Image from 'next/image';
import FormattedDate from '../components/FormatedDate';

// interface Category {
//   id: string;
//   name: string;
//   email: string;
// }

interface Props {
  searchParams: { category: string };
}

const PostsPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const posts = await prisma.post.findMany({
    where: {
      catSlug: searchParams.category,
    },
  });

  return (
    <div>
      <div className='mb-5'>
        {session && (
          <button className='btn btn-primary p-0'>
            <Link className='w-full p-4' href='/posts/new'>
              New Post
            </Link>
          </button>
        )}
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='md:basis-3/4 lg:basis-4/5 p-3'>
          {posts.map((post) => (
            <div className='flex bg-neutral p-3 m-4' key={post.id}>
              <figure className=' basis-2/5 p-3'>
                <Link href={`/posts/${post.slug}`}>
                  <Image
                    alt={post.slug}
                    width={1920}
                    height={1080}
                    src={`/nextdev-images/${post.img}`}
                  />
                </Link>
              </figure>
              <div className=' basis-3/5 p-3'>
                <h2 className=''>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className=''>
                  <FormattedDate ufdate={post.createdAt} />
                </p>
                <p className=''>{post.short}</p>
                <div className='justify-center my-3'>
                  {session && (
                    <>
                      <EditPostButton postSlug={post.slug} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
          <CategoriesModule />
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default PostsPage;
