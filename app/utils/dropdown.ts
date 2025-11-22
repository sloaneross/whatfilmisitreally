import type { Film } from "./database";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownState {
  selectedValue: string;
  isOpen: boolean;
}

export function handleDropdownChange(
  value: string,
  callback?: (value: string) => void
): void {
  if (callback) {
    callback(value);
  }
  console.log("Dropdown selected:", value);
}

export function handleDropdownClick(
  isOpen: boolean,
  callback?: (isOpen: boolean) => void
): void {
  const newState = !isOpen;
  if (callback) {
    callback(newState);
  }
  console.log("Dropdown open state:", newState);
}

/**
 * Transforms films array into dropdown options
 * @param films Array of Film objects
 * @returns DropdownOption[] Array of dropdown options
 */
export function filmsToDropdownOptions(films: Film[]): DropdownOption[] {
  return [
    { value: "", label: "Select a film..." },
    ...films.map((film) => ({
      value: film.id.toString(),
      label: film.brand?.name && film.name 
        ? `${film.brand.name} ${film.name}`
        : film.name || `Film ${film.id}`,
    })),
  ];
}

