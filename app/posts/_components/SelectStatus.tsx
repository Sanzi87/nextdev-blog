'use client';

interface SelectStatusProps {
  selectedStatus: string;
  onChange: (status: string) => void;
}

const SelectStatus = ({ selectedStatus, onChange }: SelectStatusProps) => {
  return (
    <select
      className='select select-bordered w-full input-lg'
      value={selectedStatus}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Select Status</option>
      <option key='1' value='1'>
        Published
      </option>
      <option key='0' value='0'>
        Unpublished
      </option>
    </select>
  );
};

export default SelectStatus;
