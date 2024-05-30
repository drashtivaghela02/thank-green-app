// FilterContext.js
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(false);
  const [sorting, setSorting] = useState(false);

  return (
    <FilterContext.Provider value={{ filters, setFilters, sorting, setSorting }}>
      {children}
    </FilterContext.Provider>
  );
};
