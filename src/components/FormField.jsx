import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="mb-2 flex items-center gap-2">
      <label htmlFor={name} className="text-gray-900 block text-sm font-medium">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="text-black rounded-[5px] bg-[#EcECF1] py-1 px-2 text-xs font-semibold"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 border-gray-300 text-gray-900 block w-full rounded-lg border p-3 text-sm outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
