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

  const getReCaptchaToken = async () => {
    return new Promise<string>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(SITE_KEY!, { action: 'submit' })
          .then(resolve, () => {
            console.error('reCAPTCHA error');
            resolve('');
          });
      });
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setError('');

    try {
      const token = await getReCaptchaToken();
      const res = await axios.post('/api/contact', { ...data, token });

      if (res.data.status === 201) {
        reset();
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'light',
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className='max-w-xl mx-auto my-10'>
      {error && (
        <div role='alert' className='alert alert-error mb-5'>
          <span>{error}</span>
        </div>
      )}
      <h1 className='mb-8'>Contact</h1>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
      />
      <form className='space-y-4' onSubmit={onSubmit}>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <input
          type='text'
          placeholder='Name'
          {...register('name')}
          className='input input-bordered input-lg w-full'
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <input
          type='text'
          aria-label='Email address'
          placeholder='Email address'
          {...register('email')}
          className='input input-bordered input-lg w-full'
        />

        {errors.subject && (
          <ErrorMessage>{errors.subject.message}</ErrorMessage>
        )}
        <input
          type='text'
          aria-label='Subject'
          placeholder='Subject...'
          {...register('subject')}
          className='input input-bordered input-lg w-full'
        />

        {errors.message && (
          <ErrorMessage>{errors.message.message}</ErrorMessage>
        )}
        <textarea
          aria-label='Message'
          placeholder='Message...'
          rows={7}
          {...register('message')}
          className='textarea textarea-bordered textarea-lg w-full'
        />

        <button disabled={isSubmitting} className='btn btn-primary'>
          Send {isSubmitting && <Spinner />}
        </button>
      </form>
      <ToastContainer position='top-center' autoClose={5000} theme='light' />
    </div>
  );
};

export default ContactForm;
