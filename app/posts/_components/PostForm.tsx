'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Post } from '@prisma/client';
import Link from 'next/navigation';

// interface PostForm {
//   title: string;
//   slug: string;
// }

type PostFormData = z.infer<typeof postSchema>;

// interface Props {
//   post?: Post
// }

const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const {
    register,
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
    <div className='max-w-xl'>
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

      <form className='space-y-3' onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.title}
          placeholder='Title'
          {...register('title')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.slug}
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.desc}
          placeholder='Post'
          {...register('desc')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <ErrorMessage>{errors.catSlug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.catSlug}
          placeholder='Category'
          {...register('catSlug')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <ErrorMessage>{errors.catSlug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={post?.userEmail}
          placeholder='User'
          {...register('userEmail')}
          className='input input-bordered w-full max-w-xs form-control'
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
