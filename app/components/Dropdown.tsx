"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFilms } from "../context/FilmsContext";
import {
  handleDropdownChange,
  filmsToDropdownOptions,
  type DropdownOption,
} from "../utils/dropdown";

export default function Dropdown() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const router = useRouter();
  const { films } = useFilms(); // Get films from context (loaded once on app startup)

  // Transform films to dropdown options (no API call needed)
  const options = filmsToDropdownOptions(films);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    handleDropdownChange(value, (newValue) => {
      setSelectedValue(newValue);
    });
    
    // Navigate to film page if a film is selected
    if (value && value !== "") {
      router.push(`/film/${value}`);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-black dark:border-gray-700"
    >
      {options.map((option: DropdownOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

