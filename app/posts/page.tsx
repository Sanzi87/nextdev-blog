import React from 'react';
import prisma from '@/prisma/client';
import Link from 'next/link';
import EditPostButton from './[slug]/EditPostButton';
import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';

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
      <div className='flex flex-wrap justify-center mt-10'>
        {posts.map((post) => (
          <div className='card w-96 glass m-4' key={post.id}>
            <figure>
              <Link href={`/posts/${post.slug}`}>
                <img
                  src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
                  alt='car!'
                />
              </Link>
            </figure>
            <div className='card-body'>
              <h2 className='card-title justify-center'>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className='text-center'>See all {post.title} posts.</p>
              <div className='card-actions justify-center'>
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
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default PostsPage;
