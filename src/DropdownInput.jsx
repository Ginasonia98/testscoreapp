import React, { useState, useEffect, useRef } from "react";

const DropdownInput = ({ value, onChange, options }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);

    if (!isNaN(numericValue)) {
      const filtered = options.filter((option) =>
        option.startsWith(inputValue)
      );
      setFilteredOptions(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }

    onChange(inputValue);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="w-full focus:outline-none"
      />
      {isDropdownVisible && (
        <div className="absolute z-50 bg-white mt-1 p-1 rounded-md shadow-md w-full">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className="cursor-pointer py-1 px-2 hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;