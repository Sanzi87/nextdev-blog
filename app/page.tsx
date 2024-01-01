import LatestPosts from './PostsComponent';
import CreatePostModule from './components/CreatePostModule';
import CategoriesModule from './components/CategoriesModule';
import { Metadata } from 'next';

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='md:basis-3/4 lg:basis-4/5 p-3'>
        <h1>NextDev Solution Blog</h1>
        <h2>Featured posts</h2>
        <LatestPosts featured={'1'} />
        <h2>Recent posts</h2>
        <LatestPosts />
      </div>
      <div className='md:basis-1/4 lg:basis-1/5 flex flex-col gap-4 p-5'>
        <CreatePostModule />
        <CategoriesModule />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'NexDev Solution Blog - Explore Web Development',
  description:
    'Explore the world of web development with NextDev Solutions. Dive into insightful blog posts covering HTML, CSS, JavaScript, React, Next JS, PHP, Python, and more. Uncover practical tips, code demos, and stay updated on the latest trends.',
};
