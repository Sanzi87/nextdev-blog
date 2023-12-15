import React from 'react';

const NewCategoryPage = () => {
  return (
    <div className='space-y-3'>
      <input
        type='text'
        placeholder='Title'
        className='input input-bordered w-full max-w-xs form-control'
      />
      <input
        type='text'
        placeholder='Slug'
        className='input input-bordered w-full max-w-xs form-control'
      />
      <button className='btn btn-success'>Create Category</button>
    </div>
  );
};

export default NewCategoryPage;
