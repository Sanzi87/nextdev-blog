'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import categorySchema from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Category } from '@prisma/client';
import Link from 'next/navigation';

// interface CategoryForm {
//   title: string;
//   slug: string;
// }

type CategoryFormData = z.infer<typeof categorySchema>;

// interface Props {
//   category?: Category
// }

const CategoryForm = ({ category }: { category?: Category }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (category) await axios.patch('/api/categories/' + category.slug, data);
      else await axios.post('/api/categories', data);
      router.push('/categories');
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
          defaultValue={category?.title}
          placeholder='Title'
          {...register('title')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.slug}
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <button disabled={isSubmitting} className='btn btn-primary'>
          {category ? 'Update' : 'Create'} Category{' '}
          {isSubmitting && <Spinner />}
        </button>
        <button className='btn btn-outline p-0 ml-3'>
          <a className='w-full p-4' href='/categories'>
            Cancel
          </a>
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
