'use client';
import React from 'react';

const SelectUser = () => {
  return (
    <select className='select select-bordered w-full input-lg'>
      <option disabled selected>
        Select Author
      </option>
      <option value='dala.software.sweden@gmail.com'>Alexander</option>
      <option value='sanzi7891@gmail.com'>D Software</option>
    </select>
  );
};

export default SelectUser;
