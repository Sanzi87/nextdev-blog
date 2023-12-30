'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { postSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@prisma/client';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import SelectCategory from './SelectCategory';
import SelectUser from './SelectUser';
import SelectStatus from './SelectStatus';
import SelectFeatured from './SelectFeatured';

type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      userId: post?.userId,
      catSlug: post?.catSlug,
      status: post?.status,
      featured: post?.featured,
    },
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(post?.userId || '');
  const [selectedCatSlug, setSelectedCatSlug] = useState(post?.catSlug || '');
  const [selectedStatus, setSelectedStatus] = useState(post?.status || '');
  const [selectedFeatured, setSelectedFeatured] = useState(
    post?.featured || ''
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const slug = generateSlug(title);
    setValue('slug', slug);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
    setValue('userId', userId);
  };

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCatSlug(catSlug);
    setValue('catSlug', catSlug);
  };

  const handlerStatusChange = (status: string) => {
    setSelectedStatus(status);
    setValue('status', status);
  };

  const handlerFeaturedChange = (featured: string) => {
    setSelectedFeatured(featured);
    setValue('featured', featured);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      data.userId = selectedUserId;
      if (post) await axios.patch('/api/posts/' + post.slug, data);
      else await axios.post('/api/posts', data);
      router.push('/posts');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl mx-auto my-10'>
      {error && (
        <div role='alert' className='alert alert-error mb-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <h2 className='mb-8'>{post ? 'Update' : 'Create'} post</h2>
      <form className='space-y-4' onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.title}
          placeholder='Title'
          {...register('title')}
          onChange={handleTitleChange}
          className='input input-bordered input-lg w-full form-control'
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.slug}
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered input-lg w-full form-control'
        />

        <ErrorMessage>{errors.catSlug?.message}</ErrorMessage>
        <SelectCategory
          selectedCategory={selectedCatSlug}
          onChange={handleCategoryChange}
        />

        <ErrorMessage>{errors.userId?.message}</ErrorMessage>
        <SelectUser
          selectedUserId={selectedUserId}
          onChange={handleUserChange}
        />

        <ErrorMessage>{errors.status?.message}</ErrorMessage>
        <SelectStatus
          selectedStatus={selectedStatus}
          onChange={handlerStatusChange}
        />

        <ErrorMessage>{errors.featured?.message}</ErrorMessage>
        <SelectFeatured
          selectedFeatured={selectedFeatured}
          onChange={handlerFeaturedChange}
        />

        <ErrorMessage>{errors.img?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.img}
          placeholder='Image'
          {...register('img')}
          className='input input-bordered input-lg w-full form-control'
        />

        <input
          type='text'
          defaultValue={post?.short}
          placeholder='Short...'
          {...register('short')}
          className='input input-bordered input-lg w-full form-control'
        />

        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
        <Controller
          name='desc'
          control={control}
          defaultValue={post?.desc}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder='Post'
              // options={{
              //   showIcons: ['strikethrough', 'table', 'code'],
              //   hideIcons: [],
              // }}
            ></SimpleMDE>
          )}
        />

        <button disabled={isSubmitting} className='btn btn-primary'>
          {post ? 'Update' : 'Create'} Post {isSubmitting && <Spinner />}
        </button>
        <button className='btn btn-outline p-0 ml-3'>
          <a className='w-full p-4' href='/posts'>
            Cancel
          </a>
        </button>
      </form>
    </div>
  );
};

export default PostForm;
