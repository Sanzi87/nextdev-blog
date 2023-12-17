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
import SelectUser from './SelectUser';

type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
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
    <div className='max-w-xl mx-auto'>
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

      <form className='space-y-4' onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.title}
          placeholder='Title'
          {...register('title')}
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
        <input
          type='text'
          defaultValue={post?.catSlug}
          placeholder='Category'
          {...register('catSlug')}
          className='input input-bordered input-lg w-full form-control'
        />
        <ErrorMessage>{errors.userEmail?.message}</ErrorMessage>
        <SelectUser />
        {/* <input
          type='text'
          defaultValue={post?.userEmail}
          placeholder='User'
          {...register('userEmail')}
          className='input input-bordered input-lg w-full form-control'
        /> */}
        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
        <Controller
          name='desc'
          control={control}
          defaultValue={post?.desc}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder='Post'></SimpleMDE>
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
