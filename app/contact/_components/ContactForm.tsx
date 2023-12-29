'use client';
import React, { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import { contactSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
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
      <h1 className='mb-8'>Contact</h1>
      <form className='space-y-4' onSubmit={onSubmit}>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <input
          type='text'
          placeholder='Name'
          {...register('name')}
          className='input input-bordered input-lg w-full form-control'
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <input
          type='text'
          placeholder='Email address'
          {...register('email')}
          className='input input-bordered input-lg w-full form-control'
        />
        <ErrorMessage>{errors.subject?.message}</ErrorMessage>
        <input
          type='text'
          placeholder='Subject...'
          {...register('subject')}
          className='input input-bordered input-lg w-full form-control'
        />

        <ErrorMessage>{errors.message?.message}</ErrorMessage>
        <textarea
          className='textarea textarea-bordered textarea-lg w-full form-control'
          placeholder='Message...'
          rows={7}
          {...register('message')}
        ></textarea>

        <button disabled={isSubmitting} className='btn btn-primary'>
          Send {isSubmitting && <Spinner />}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
