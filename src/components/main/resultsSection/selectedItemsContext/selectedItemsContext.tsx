"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IPerson } from "../../../../types/types";

interface SelectedItemsContextProps {
  selectedItems: IPerson[];
  setSelectedItems: (selected: IPerson[]) => void;
}

const SelectedItemsContext = createContext<SelectedItemsContextProps | undefined>(undefined);

export const SelectedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<IPerson[]>([]);

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

export const useSelectedItems = (): SelectedItemsContextProps => {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error("useSelectedItems must be used within a SelectedItemsProvider");
  }
  return context;
};
