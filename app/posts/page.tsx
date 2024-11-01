import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import CategoriesModule from '../components/CategoriesModule';
import CreatePostModule from '../components/CreatePostModule';
import Pagination from '../components/Pagination';
import PostList, { PostQuery } from './PostList';
import { usePosts, PostStatus } from '@/app/hooks/usePosts';

interface Props {
  searchParams: Promise<PostQuery>;
}

const PostsPage = async (props: Props) => {
  try {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 5;
    const session = await getServerSession(authOptions);
    const userRole = session?.user.role;

    const { posts, postCount } = await usePosts(
      page,
      pageSize,
      searchParams.category,
      userRole
    );

    return (
      <div className='flex flex-col lg:flex-row'>
        <div className='md:basis-3/4 lg:basis-4/5 p-3'>
          <h1>
            Blog posts{' '}
            {searchParams.category && <span> - {searchParams.category}</span>}
          </h1>
          <PostList
            searchParams={searchParams}
            posts={posts}
            session={session}
          />
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
  } catch (error) {
    return (
      <div className='p-5'>
        <h2>Error loading posts</h2>
        <p>There was an issue loading the posts. Please try again later.</p>
      </div>
    );
  }
};

export default PostsPage;

export const metadata: Metadata = {
  title: 'Explore Web Development Posts at NextDev Solutions',
  description:
    'Dive into a treasure trove of web development posts at NextDev Solutions. From tutorials and tips to code demos, stay informed and inspired in the dynamic world of HTML, CSS, JavaScript, React, Next JS, and beyond.',
};
