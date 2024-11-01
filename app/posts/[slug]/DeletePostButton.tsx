'use client';
import Spinner from '@/app/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeletePostButton = ({ postSlug }: { postSlug: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const deletePost = async () => {
    try {
      setDeleting(true);
      await axios.delete('/api/posts/' + postSlug);
      router.push('/posts');
      router.refresh();
    } catch (error) {
      setError(true);
    } finally {
      setDeleting(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        disabled={isDeleting}
        className='btn btn-error'
        onClick={() => setModalOpen(true)}
      >
        Delete
        {isDeleting && <Spinner />}
      </button>

      {isModalOpen && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Confirm Deletion</h3>
            <p className='py-4'>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className='modal-action'>
              <button
                className='btn btn-outline'
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className='btn btn-error ml-2'
                onClick={deletePost}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Error</h3>
            <p className='py-4'>This post could not be deleted.</p>
            <div className='modal-action'>
              <button
                className='btn btn-outline'
                onClick={() => setError(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostButton;
