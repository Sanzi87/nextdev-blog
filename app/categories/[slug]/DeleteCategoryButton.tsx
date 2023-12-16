'use client';
import Link from 'next/link';
import React from 'react';

const DeleteCategoryButton = ({ categorySlug }: { categorySlug: string }) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='btn btn-error'
        onClick={() => document.getElementById('my_modal_5').showModal()}
      >
        {/* <Link href={`/categories/${categorySlug}/edit`}>Delete</Link> */}{' '}
        Delete
      </button>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Confirm Deletion</h3>
          <p className='py-4'>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-outline'>Cancel</button>
              <button className='btn btn-error ml-2'>
                <Link href={`/categories/${categorySlug}/edit`}>Delete</Link>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteCategoryButton;
