import prisma from '@/prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import FormattedDate from './components/FormatedDate';
import EditPostButton from './posts/[slug]/EditPostButton';

interface Props {
  featured?: string;
}

const LatestPosts = async ({ featured }: Props) => {
  const posts = await prisma.post.findMany({
    where: { status: '1', featured },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  return (
    <>
      {posts.map((post) => (
        <div
          className='flex flex-col text-center md:text-left md:flex-row bg-neutral p-3 m-4'
          key={post.id}
        >
          <figure className=' basis-2/5 p-3'>
            <Link href={`/posts/${post.slug}`}>
              <Image
                className='object-cover h-full w-full'
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
            <p className=' p-1'>
              <FormattedDate ufdate={post.createdAt} />
              <span className='bg-base-100 uppercase font-bold p-1 ml-3'>
                {post.catSlug}
              </span>
            </p>
            <p className=''>{post.short}</p>
            <div className='justify-center my-3'>
              <EditPostButton postSlug={post.slug} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LatestPosts;
