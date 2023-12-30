'use client';

interface SelectFeaturedProps {
  selectedFeatured: string;
  onChange: (status: string) => void;
}

const SelectFeatured = ({
  selectedFeatured,
  onChange,
}: SelectFeaturedProps) => {
  return (
    <select
      className='select select-bordered w-full input-lg'
      value={selectedFeatured}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Featured?</option>
      <option value='0'>Not Featured</option>
      <option value='1'>Featured</option>
    </select>
  );
};

export default SelectFeatured;
