'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };
  return (
    <div className='flex gap-2 items-center justify-center mt-10 mb-2'>
      <button
        className='btn btn-sm px-2 btn-primary p-0'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button
        className='btn btn-sm px-2 btn-primary p-0'
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <button
        className='btn btn-sm px-2 btn-primary p-0'
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
      <button
        className='btn btn-sm px-2 btn-primary p-0'
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
