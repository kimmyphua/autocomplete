import { SetStateAction, useState } from "react";

import { Country } from "../ts/Country.interface";

const useAutocomplete = (data: Country[]) => {
 const [searchedValue, setSearchedValue] = useState("");
 const [suggestions, setSuggestions] = useState<Country[]>([]);
 const [selectedSuggestion, setSelectedSuggestion] = useState("");
 const [activeSuggestion, setActiveSuggestion] = useState(0);

 const filterSuggestions = (val: string) => {
  return data.filter((itemData) => {
   const value = val.toUpperCase();
   const name = itemData.name.common.toUpperCase();

   return value && name.startsWith(value);
  });
 };
 const handleChange = (event: {
  target: { value: SetStateAction<string> };
 }): void => {
  if (event.target.value !== "") {
   const filteredSuggestions = filterSuggestions(event.target.value.toString());
   setSearchedValue(event.target.value);
   setSuggestions(filteredSuggestions);
  } else {
   setSearchedValue("");
   setSuggestions([]);
   setSelectedSuggestion("");
   setActiveSuggestion(0);
  }
 };
 const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
   setActiveSuggestion(activeSuggestion + 1);
  } else if (event.key === "ArrowUp" && activeSuggestion > 1) {
   setActiveSuggestion(activeSuggestion - 1);
  } else if (event.key === "Enter") {
   setSearchedValue(suggestions[activeSuggestion - 1].name.common);
   setSelectedSuggestion(suggestions[activeSuggestion - 1].name.common);
   setSuggestions([]);
   setActiveSuggestion(0);
  }
 };

 const handleClick = (value: string) => {
  setSearchedValue(value);
  setSuggestions(filterSuggestions(value));
  setSelectedSuggestion(value);
  setActiveSuggestion(0);
 };

 return {
  searchedValue,
  suggestions,
  selectedSuggestion,
  activeSuggestion,
  handleChange,
  handleKeyDown,
  handleClick,
 };
};

export default useAutocomplete;
