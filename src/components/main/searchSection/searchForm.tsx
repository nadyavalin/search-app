"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchForm = ({ searchTerm, setSearchTerm }: SearchFormProps) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    if (searchTerm === "") {
      router.push("/");
    } else {
      router.push(`/?search=${searchTerm}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm} data-testid="search-form">
      <input
        className={styles.searchInput}
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};
