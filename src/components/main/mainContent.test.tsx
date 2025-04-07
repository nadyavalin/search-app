import { render, screen, waitFor } from "@testing-library/react";
import { MainContent } from "./mainContent";
import { fetchPeople } from "../../api/api";
import * as nextNavigation from "next/navigation";
import * as localStorageUtils from "../../utils/utils";
import * as api from "../../api/api";

vi.mock("next/navigation");

const useSearchParamsMock = vi.fn();
vi.spyOn(nextNavigation, "useSearchParams").mockImplementation(useSearchParamsMock);

const getItemFromLocalStorageMock = vi.fn();
vi.spyOn(localStorageUtils, "getItemFromLocalStorage").mockImplementation(
  getItemFromLocalStorageMock,
);

const fetchPeopleMock = vi.fn();
vi.spyOn(api, "fetchPeople").mockImplementation(fetchPeopleMock);

vi.mock("./searchSection/searchForm", () => ({
  SearchForm: vi.fn(() => <div>SearchForm Component</div>),
}));

vi.mock("./resultsSection/peopleList/peopleList", () => ({
  PeopleList: vi.fn(() => <div>PeopleList Component</div>),
}));

vi.mock("./resultsSection/pagination/pagination", () => ({
  Pagination: vi.fn(() => <div>Pagination Component</div>),
}));

vi.mock("../loader/loader", () => ({
  Loader: vi.fn(() => <div>Loading...</div>),
}));

vi.mock("./theme/themeToggle/themeToggle", () => ({
  ThemeToggle: vi.fn(() => <div>ThemeToggle Component</div>),
}));

describe("MainContent", () => {
  const mockSearchParams = {
    get: vi.fn(),
  };

  const mockUseSearchTermLocalStorage = {
    searchTerm: "test",
    setSearchTerm: vi.fn(),
  };

  const mockFetchPeopleResponse = {
    results: [
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        eye_color: "blue",
        gender: "male",
        hair_color: "blond",
        height: "172",
        mass: "77",
        skin_color: "fair",
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
      },
    ],
  };

  beforeEach(() => {
    useSearchParamsMock.mockReturnValue(mockSearchParams);
    getItemFromLocalStorageMock.mockReturnValue(mockUseSearchTermLocalStorage);
    fetchPeopleMock.mockResolvedValue(mockFetchPeopleResponse);
    mockSearchParams.get.mockImplementation((key: string) => {
      if (key === "search") return "test";
      if (key === "page") return "1";
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loader during data fetch", () => {
    fetchPeopleMock.mockImplementation(() => new Promise(() => {}));
    render(<MainContent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    const errorMessage = "Failed to fetch data";
    fetchPeopleMock.mockRejectedValue(new Error(errorMessage));
    render(<MainContent />);
    await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
  });

  it("renders SearchForm, PeopleList, Pagination, and ThemeToggle components on successful fetch", async () => {
    render(<MainContent />);
    await waitFor(() => {
      expect(screen.getByText("SearchForm Component")).toBeInTheDocument();
      expect(screen.getByText("PeopleList Component")).toBeInTheDocument();
      expect(screen.getByText("Pagination Component")).toBeInTheDocument();
      expect(screen.getByText("ThemeToggle Component")).toBeInTheDocument();
    });
  });

  it("updates state based on search params and fetch response data", async () => {
    render(<MainContent />);
    await waitFor(() => {
      expect(fetchPeople).toHaveBeenCalledWith(expect.any(URLSearchParams), 1);
      expect(screen.getByText("PeopleList Component")).toBeInTheDocument();
    });
  });
});
