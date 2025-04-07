"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { useSearchTermLocalStorage } from "../../hooks/useSearchTermLocalStorage";
import { SearchForm } from "./searchSection/searchForm";
import { PeopleList } from "./resultsSection/peopleList/peopleList";
import { Pagination } from "./resultsSection/pagination/pagination";
import { Loader } from "../loader/loader";
import { ThemeToggle } from "./theme/themeToggle/themeToggle";
import { fetchPeople } from "../../api/api";
import { PeopleResponse } from "../../types/types";

export const MainContent = ({ children }: PropsWithChildren) => {
  const { searchTerm, setSearchTerm } = useSearchTermLocalStorage();
  const searchParams = useSearchParams();

  const [data, setData] = useState<PeopleResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const searchTermFromParams = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;

    const fetchAndSetData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchTermFromParams) {
          params.set("search", searchTermFromParams);
        }

        const response = await fetchPeople(params, page);
        setData(response);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [searchParams]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.searchSection}>
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </section>
        <div className={styles.resultSectionWithDetails}>
          <section className={styles.resultsSection}>
            <PeopleList people={data?.results || []} />
            <Pagination peopleResponse={data} searchParams={searchParams} />
          </section>
          {children}
        </div>
        <ThemeToggle />
      </main>
    </>
  );
};
