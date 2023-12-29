import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';
import CategoriesModule from '../components/CategoriesModule';
import Pagination from '../components/Pagination';
import PostList from './PostList';
import { Props } from './page';

export const PostsPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const where = { catSlug: searchParams.category };

  const posts = await prisma.post.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const postCount = await prisma.post.count({ where });

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div className='md:basis-3/4 lg:basis-4/5 p-3'>
          <PostList searchParams={searchParams} posts={posts} />
          <Pagination
            itemCount={postCount}
            pageSize={pageSize}
            currentPage={page}
          />
        </div>
        <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
          <div className='mb-5 text-center'>
            {session && (
              <button className='btn btn-primary p-0'>
                <Link className='w-full p-4' href='/posts/new'>
                  CREATE POST
                </Link>
              </button>
            )}
          </div>
          <CategoriesModule />
        </div>
      </div>
    </div>
  );
};
