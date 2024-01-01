import React from 'react';
import CategoryForm from '../_components/CategoryForm';
import { Metadata } from 'next';

const NewCategoryPage = () => {
  return <CategoryForm />;
};

export default NewCategoryPage;

export const metadata: Metadata = {
  title: 'Add new category - NextDev Solutions',
  description: 'Add new category - NextDev Solutions',
};
