'use client';

import { Category } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SelectCategoryProps {
  selectedCategory: string;
  onChange: (categorySlug: string) => void;
}

const SelectCategory = ({
  selectedCategory,
  onChange,
}: SelectCategoryProps) => {
  const { data: categories, error } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => axios.get('/api/categories').then((res) => res.data),
    staleTime: 120 * 1000,
    retry: 3,
  });

  if (error) return <p className='text-red'>Cannot fetch Categories.</p>;

  return (
    <select
      className='select select-bordered w-full input-lg'
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Select Category</option>
      {categories?.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.title}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
