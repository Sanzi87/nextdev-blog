'use client';
import React, { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import { contactSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

type ContactFormData = z.infer<typeof contactSchema>;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      // Use grecaptcha to generate a token
      const token: string = await new Promise((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(SITE_KEY!, { action: 'submit' }).then(
            (response: string) => resolve(response),
            (error: unknown) => {
              console.error('reCAPTCHA error:', error);
              resolve('');
            }
          );
        });
      });

      const res = await axios.post('/api/contact', { ...data, token });
      if (res.data.status === 201) {
        reset();

        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error(res.data.message);
      }

      setSubmitting(false);
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
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      />
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
      <div>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </div>
  );
};

export default ContactForm;
