import React from 'react';
import { StepProps } from './Question/type';
import Image from 'next/image';
import { MoveRight, XIcon } from 'lucide-react';

import CustomCheckbox from './CustomCheckbox';

const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ type, placeholder, value, onChange, required }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border mb-3 rounded-md text-sm"
    required={required}
  />
);

const PersonalDetails: React.FC<StepProps & { onClose: () => void }> = ({
  formData,
  handleChange,
  nextStep,
  onClose,
}) => (
  <div >
   <button onClick={onClose} className="absolute top-3 right-4">
    <XIcon className="h-5 w-5 text-gray-600" />
  </button>
    <Image src="/ModalLogo.png" className="h-12 w-12 mx-auto mt-5" alt="" width={200} height={200} />
    <h2 className="text-xl font-semibold mb-4 mt-6 text-center">Enter Details</h2>

    <InputField
      type="text"
      placeholder="Your Full Name"
      value={formData.name}
      onChange={(e) => handleChange('name', e.target.value)}
      required
    />
    <InputField
      type="email"
      placeholder="Your Email Address"
      value={formData.email}
      onChange={(e) => handleChange('email', e.target.value)}
      required
    />
    <InputField
      type="text"
      placeholder="Your LinkedIn URL"
      value={formData.linkedIn}
      onChange={(e) => handleChange('linkedIn', e.target.value)}
    />

    <CustomCheckbox
      label="Receive updates via email"
      checked={formData.emailNotification}
      onChange={() => handleChange('emailNotification', !formData.emailNotification)}
    />

    <button
      className="mt-6 mb-8 w-full flex justify-center items-center gap-x-2 mx-auto bg-gradient-to-r from-[#6562aa] to-[#9996DE] text-white px-6 py-3 rounded-3xl hover:bg-violet-700"
      onClick={nextStep}
      disabled={!formData.name || !formData.email}
    >
      Start Assessment <MoveRight className="h-5 w-5" />
    </button>
  </div>
);

export default PersonalDetails;
