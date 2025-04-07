import { render, screen } from "@testing-library/react";
import styles from "./styles.module.css";
import { Pagination } from "./pagination";
import { PeopleResponse } from "../../../../types/types";

describe("Pagination Component", () => {
  const mockPeopleResponse: PeopleResponse = {
    count: 25,
    next: "https://swapi.dev/api/people/?page=2",
    previous: "https://swapi.dev/api/people/?page=1",
    results: [],
  };

  const mockSearchParams = new URLSearchParams("page=1");

  test("renders pagination links correctly with data", () => {
    render(<Pagination peopleResponse={mockPeopleResponse} searchParams={mockSearchParams} />);

    expect(screen.getByRole("link", { name: "Prev" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("renders previous link as disabled if no previous page", () => {
    const mockPeopleResponseNoPrevious: PeopleResponse = {
      count: 10,
      next: "https://swapi.dev/api/people/?page=2",
      previous: null,
      results: [],
    };

    render(
      <Pagination peopleResponse={mockPeopleResponseNoPrevious} searchParams={mockSearchParams} />,
    );

    const prevLink = screen.getByRole("link", { name: "Prev" });
    expect(prevLink).toHaveClass(styles.paginationLinkDisabled);
  });

  test("renders next link as disabled if no next page", () => {
    const mockPeopleResponseNoNext: PeopleResponse = {
      count: 10,
      next: null,
      previous: "https://swapi.dev/api/people/?page=1",
      results: [],
    };

    render(
      <Pagination peopleResponse={mockPeopleResponseNoNext} searchParams={mockSearchParams} />,
    );

    const nextLink = screen.getByRole("link", { name: "Next" });
    expect(nextLink).toHaveClass(styles.paginationLinkDisabled);
  });

  test("highlights the active page number", () => {
    const mockSearchParamsActivePage2 = new URLSearchParams("page=2");

    render(
      <Pagination peopleResponse={mockPeopleResponse} searchParams={mockSearchParamsActivePage2} />,
    );

    const numberLink = screen.getByRole("link", { name: "2" });
    expect(numberLink).toHaveClass(styles.paginationLinkActive);
  });

  test("renders pagination correctly with no data", () => {
    render(<Pagination peopleResponse={undefined} searchParams={mockSearchParams} />);

    expect(screen.getByRole("link", { name: "Prev" })).toHaveClass(styles.paginationLinkDisabled);
    expect(screen.getByRole("link", { name: "Next" })).toHaveClass(styles.paginationLinkDisabled);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
