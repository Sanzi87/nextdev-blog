'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    delete_confirmation: HTMLFormElement;
  }
}

const DeleteCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  const router = useRouter();
  return (
    <>
      <button
        className='btn btn-error'
        onClick={() => window.delete_confirmation.showModal()}
      >
        Delete
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
              <button
                className='btn btn-error ml-2 '
                onClick={async () => {
                  await axios.delete('/api/categories/' + categorySlug);
                  router.push('/categories');
                  router.refresh();
                }}
              >
                {/* <Link href={`/categories/${categorySlug}/edit`}>Delete</Link> */}
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteCategoryButton;
