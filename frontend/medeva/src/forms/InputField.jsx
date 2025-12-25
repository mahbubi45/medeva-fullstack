// InputField.js
import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name} // Sangat Penting: Untuk mengenali field di API
        value={value} // Sangat Penting: Data dari state
        onChange={onChange} // Sangat Penting: Fungsi untuk update state
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;
