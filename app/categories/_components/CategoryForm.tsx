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
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

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
      <h2 className='mb-8'>{category ? 'Update' : 'Create'} category</h2>
      <form className='space-y-3' onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.title}
          placeholder='Title'
          {...register('title')}
          onChange={handleTitleChange}
          className='input input-bordered w-full input-lg form-control'
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.slug}
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered w-full input-lg form-control'
        />

        <ErrorMessage>{errors.img?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.img}
          placeholder='Image'
          {...register('img')}
          className='input input-bordered input-lg w-full form-control'
        />

        <ErrorMessage>{errors.desc?.message}</ErrorMessage>
        <input
          type='text'
          defaultValue={category?.desc || ''}
          placeholder='Description'
          {...register('desc')}
          className='input input-bordered input-lg w-full form-control'
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
