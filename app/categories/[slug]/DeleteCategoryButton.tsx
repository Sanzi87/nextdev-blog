'use client';
import Spinner from '@/app/components/Spinner';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

declare global {
  interface Window {
    delete_confirmation: HTMLFormElement;
  }
}

const DeleteCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setDeleting] = useState(false);

  const deleteCategory = async () => {
    try {
      setDeleting(true);
      setError(null);
      await axios.delete('/api/categories/' + categorySlug);
      router.push('/categories');
      router.refresh();
    } catch (err) {
      setDeleting(false);
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message || 'This category could not be deleted.'
        );
      } else {
        setError(
          'This category could not be deleted due to an unexpected error.'
        );
      }
    }
  };

  return (
    <>
      <button
        disabled={isDeleting}
        className='btn btn-error'
        onClick={() => window.delete_confirmation.showModal()}
      >
        Delete
        {isDeleting && <Spinner />}
      </button>
      <dialog
        id='delete_confirmation'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Confirm Deletion</h3>
          <p className='py-4'>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-outline'>Cancel</button>
              <button className='btn btn-error ml-2 ' onClick={deleteCategory}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog
        id='delete_error'
        className={`modal modal-bottom sm:modal-middle ${
          error ? 'modal-open' : ''
        }`}
      >
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Error</h3>
          <p className='py-4'>This category could not be deleted.</p>
          <div className='modal-action'>
            <form method='dialog'>
              <button
                className='btn btn-outline'
                onClick={() => setError(null)}
              >
                Ok
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteCategoryButton;
