import Link from 'next/link';
import React from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <div className='flex gap-2 items-center justify-center mt-10 mb-2'>
      <button
        className='btn btn-sm btn-primary p-0'
        disabled={currentPage === 1}
      >
        <Link className='p-2' href={`/posts/`}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </Link>
      </button>
      <button
        className='btn btn-sm btn-primary p-0'
        disabled={currentPage === 1}
      >
        <Link className='p-2' href={`/posts/`}>
          <MdOutlineKeyboardArrowLeft />
        </Link>
      </button>
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <button
        className='btn btn-sm btn-primary p-0'
        disabled={currentPage === pageCount}
      >
        <Link className='p-2' href={`/posts/`}>
          <MdOutlineKeyboardArrowRight />
        </Link>
      </button>
      <button
        className='btn btn-sm btn-primary p-0'
        disabled={currentPage === pageCount}
      >
        <Link className='p-2' href={`/posts/`}>
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </button>
    </div>
  );
};

export default Pagination;
