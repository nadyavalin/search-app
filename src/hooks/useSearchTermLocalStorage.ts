"use client";

import { useState, useEffect } from "react";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils/utils";

export const useSearchTermLocalStorage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getItemFromLocalStorage("searchTerm") ?? "";
    }
    return "";
  });

  useEffect(() => {
    setItemToLocalStorage("searchTerm", searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm };
};
