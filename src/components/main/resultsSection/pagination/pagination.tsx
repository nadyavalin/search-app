import classNames from "classnames";
import Link from "next/link";
import styles from "./styles.module.css";
import { PeopleResponse } from "../../../../types/types";

interface PaginationProps {
  peopleResponse?: PeopleResponse;
  searchParams: URLSearchParams;
}

export const Pagination = ({ peopleResponse, searchParams }: PaginationProps) => {
  const params = Object.fromEntries(searchParams.entries());
  const pageCount = Math.ceil((peopleResponse?.count ?? 0) / 10) || 1;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <>
      <div className={styles.pagination}>
        <Link
          href={`/?${new URLSearchParams({ ...params, page: String(Number(params.page ?? 1) - 1) })}`}
          className={classNames(styles.paginationLink, {
            [styles.paginationLinkDisabled]: !peopleResponse?.previous,
          })}
        >
          Prev
        </Link>
        <ul className={styles.paginationNumbers}>
          {pages.map((page) => (
            <li key={page}>
              <Link
                href={`/?${new URLSearchParams({ ...params, page: String(page) })}`}
                className={classNames(styles.paginationLink, {
                  [styles.paginationLinkActive]: Number(params.page) === page,
                })}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/?${new URLSearchParams({ ...params, page: String(Number(params.page ?? 1) + 1) })}`}
          className={classNames(styles.paginationLink, {
            [styles.paginationLinkDisabled]: !peopleResponse?.next,
          })}
        >
          Next
        </Link>
      </div>
    </>
  );
};
