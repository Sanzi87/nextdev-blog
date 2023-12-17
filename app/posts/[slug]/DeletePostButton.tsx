'use client';
import Spinner from '@/app/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

declare global {
  interface Window {
    delete_confirmation: HTMLFormElement;
  }
}

const DeletePostButton = ({ postSlug }: { postSlug: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deletePost = async () => {
    try {
      setDeleting(true);
      await axios.delete('/api/posts/' + postSlug);
      router.push('/posts');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
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
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-outline'>Cancel</button>
              <button className='btn btn-error ml-2 ' onClick={deletePost}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog
        id='delete_error'
        className={`modal modal-bottom sm:modal-middle ${
          error && 'modal-open'
        }`}
      >
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Error</h3>
          <p className='py-4'>This post could not be deleted.</p>
          <div className='modal-action'>
            <form method='dialog'>
              <button
                className='btn btn-outline'
                onClick={() => setError(false)}
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

export default DeletePostButton;
