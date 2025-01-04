import React from "react";

const FilterInput = ({ label, ...reset }) => {
  return (
    <div class="relative mb-4">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
       {label}
      </label>
      
      <input
        name="date"
        type="date"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
        placeholder="Select Date"
        {...reset}
      />
    </div>
  );
};

export default FilterInput;
