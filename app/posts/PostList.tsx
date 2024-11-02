import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import FormattedDate from '../components/FormatedDate';
import EditPostButton from './[slug]/EditPostButton';
import { Session } from 'next-auth';

export interface PostQuery {
  category: string;
  page: string;
}

interface Props {
  searchParams: PostQuery;
  posts: Post[];
  session: Session | null;
}

const PostList = ({ searchParams, posts, session }: Props) => {
  const isAdmin = session?.user.role === 'NEXTADMIN';

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
                alt={post.title}
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
            <p className='p-1 flex flex-wrap items-center'>
              <FormattedDate ufdate={post.createdAt} />
              <span className='bg-base-100 uppercase font-bold p-1 ml-3 px-3'>
                {post.catSlug}
              </span>
              {post.status === '0' && (
                <span className='bg-red-900 uppercase ml-3'>Unpublished</span>
              )}
            </p>
            <p>{post.short}</p>
            {isAdmin && (
              <div className='justify-center my-3'>
                <EditPostButton postSlug={post.slug} />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;
