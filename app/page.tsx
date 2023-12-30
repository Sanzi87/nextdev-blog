import LatestPosts from './LatestPosts';
import CreatePostModule from './components/CreatePostModule';
import CategoriesModule from './components/CategoriesModule';

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='md:basis-3/4 lg:basis-4/5 p-3'>
        <h1>NextDev Solution Blog</h1>
        <h2>Featured posts</h2>
        <LatestPosts />
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
