'use client';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

interface SelectUserProps {
  selectedUserId: string;
  onChange: (userId: string) => void;
}

const SelectUser = ({ selectedUserId, onChange }: SelectUserProps) => {
  // console.log(selectedUserId);
  const { data: users, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 120 * 1000, //120s
    retry: 3,
  });

  if (error) return <p className='text-red'>Cannot fetch users.</p>;
  return (
    <select
      className='select select-bordered w-full input-lg'
      value={selectedUserId}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Select Author</option>
      {users?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
