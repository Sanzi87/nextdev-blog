import { Post } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import authOptions from '../auth/authOptions';
import FormattedDate from '../components/FormatedDate';
import EditPostButton from './[slug]/EditPostButton';

export interface PostQuery {
  category: string;
  page: string;
}

interface Props {
  searchParams: PostQuery;
  posts: Post[];
}

const PostList = async ({ searchParams, posts }: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {posts.map((post) => (
        <div
          className='flex flex-col text-center md:text-left md:flex-row bg-neutral p-3 my-4'
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
              {post.status === '0' && (
                <span className='bg-red-900 uppercase'>Unpublished</span>
              )}
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
    </>
  );
};

export default PostList;
