'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Category } from '@prisma/client';
import DeleteCategoryButton from '../[slug]/DeleteCategoryButton';
import { AxiosError } from 'axios';
import Link from 'next/link';

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoryForm = ({ category }: { category?: Category }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          title: category.title,
          slug: category.slug,
          img: category.img,
          desc: category.desc || '',
        }
      : undefined,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    if (!category) {
      const slug = generateSlug(title);
      setValue('slug', slug);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      setError('');

      if (category) {
        await axios.patch(`/api/categories/${category.slug}`, data);
      } else {
        await axios.post('/api/categories', data);
      }

      router.push('/categories');
      router.refresh();
    } catch (err) {
      setSubmitting(false);

      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
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
      <div className='flex justify-between'>
        <h2 className='mb-8'>{category ? 'Update' : 'Create'} category </h2>
        {category?.slug && (
          <DeleteCategoryButton categorySlug={category.slug} />
        )}
      </div>
      <form className='space-y-3' onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.title}
          placeholder='Title'
          {...register('title')}
          onChange={handleTitleChange}
          className='input input-bordered w-full input-lg'
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.slug}
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered w-full input-lg'
        />

        <ErrorMessage>{errors.img?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.img}
          placeholder='Image'
          {...register('img')}
          className='input input-bordered input-lg w-full'
        />

        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.desc || ''}
          placeholder='Description'
          {...register('desc')}
          className='input input-bordered input-lg w-full'
        />

        <div className='flex gap-4'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary'
          >
            {category ? 'Update' : 'Create'} Category{' '}
            {isSubmitting && <Spinner />}
          </button>
          <Link href='/categories' className='btn btn-outline p-4'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
