'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CategoryForm {
  title: string;
  slug: string;
}

const NewCategoryPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CategoryForm>();
  const [error, setError] = useState('');
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

      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/categories', data);
            router.push('/categories');
          } catch (error) {
            setError('An unexpected error occurred.');
          }
        })}
      >
        <input
          type='text'
          placeholder='Title'
          {...register('title')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <input
          type='text'
          placeholder='Slug'
          {...register('slug')}
          className='input input-bordered w-full max-w-xs form-control'
        />
        <button className='btn btn-success'>Create Category</button>
      </form>
    </div>
  );
};

export default NewCategoryPage;
