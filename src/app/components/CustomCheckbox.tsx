import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
  isPersonalDetail :boolean
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, label, onChange ,isPersonalDetail }) => {
  const checkboxClass = checked
    ? 'border-violet-600 bg-[#6C69B1]' 
    : 'border-gray-300'; 

  return (
    <label className={`mt-2.5 flex items-center gap-3    ${isPersonalDetail ?" text-gray-400":"bg-gray-50 border p-2.5"} rounded-lg cursor-pointer transition-colors`}>
      <div
        className={`h-4 w-4 rounded border flex transition-colors ${checkboxClass}`}
        onClick={onChange}
      >
        {checked && (
          <svg
            className="h-3 w-3 self-center mx-auto text-white"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5l-7 7L3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
};

export default CustomCheckbox;
