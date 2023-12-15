'use client';
import React from 'react';
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
  return (
    <form
      className='space-y-3'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/categories', data);
        router.push('/categories');
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
  );
};

export default NewCategoryPage;
