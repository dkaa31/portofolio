import React, { createContext, useContext } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { data, loading, refetch } = usePortfolioData();
  return (
    <DataContext.Provider value={{ data, loading, refetch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
