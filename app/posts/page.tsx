import prisma from '@/prisma/client';
import CategoriesModule from '../components/CategoriesModule';
import CreatePostModule from '../components/CreatePostModule';
import Pagination from '../components/Pagination';
import PostList, { PostQuery } from './PostList';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { Metadata } from 'next';

interface Props {
  searchParams: PostQuery;
}

const PostsPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const session = await getServerSession(authOptions);

  let where: { status: string | undefined; catSlug: string } = {
    status: '1',
    catSlug: searchParams.category,
  };
  if (session) {
    where = { status: undefined, catSlug: searchParams.category };
  }

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
    <div className='flex flex-col lg:flex-row'>
      <div className='md:basis-3/4 lg:basis-4/5 p-3'>
        <PostList searchParams={searchParams} posts={posts} />
        <Pagination
          itemCount={postCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
      <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
        <CreatePostModule />
        <CategoriesModule />
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default PostsPage;

export const metadata: Metadata = {
  title: 'Explore Web Development Posts at NextDev Solutions',
  description:
    'Dive into a treasure trove of web development posts at NextDev Solutions. From tutorials and tips to code demos, stay informed and inspired in the dynamic world of HTML, CSS, JavaScript, React, Next JS, and beyond.',
};
