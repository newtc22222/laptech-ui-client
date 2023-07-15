/** @format */

import React, { useState } from 'react';

const FilterCheckbox = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    let updatedOptions;

    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-[20px] h-[20px] cursor-pointer"
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterCheckbox;
