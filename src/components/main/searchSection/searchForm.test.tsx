import { useRouter as useRouterOriginal } from "next/navigation";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "./searchForm";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const useRouterMock = vi.fn();
(useRouterOriginal as unknown as { useRouter: typeof useRouterMock }).useRouter = useRouterMock;

describe("SearchForm", () => {
  const setSearchTermMock = vi.fn();
  const initialSearchTerm = "initialSearchTerm";
  let pushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setSearchTermMock.mockClear();
    pushMock = vi.fn();
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  test("renders search form with initial value", () => {
    render(<SearchForm searchTerm={initialSearchTerm} setSearchTerm={setSearchTermMock} />);

    const searchInput = screen.getByRole("textbox") as HTMLInputElement;
    expect(searchInput.value).toBe(initialSearchTerm);
  });

  test("updates search term on input change", () => {
    render(<SearchForm searchTerm={initialSearchTerm} setSearchTerm={setSearchTermMock} />);

    const searchInput = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(setSearchTermMock).toHaveBeenCalledWith("test search");
  });

  test("does not call setSearchTerm on input change if value is the same", () => {
    render(<SearchForm searchTerm={initialSearchTerm} setSearchTerm={setSearchTermMock} />);

    const searchInput = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: initialSearchTerm } });

    expect(setSearchTermMock).not.toHaveBeenCalled();
  });

  test("trims input value before setting search term", () => {
    render(<SearchForm searchTerm="" setSearchTerm={setSearchTermMock} />);

    const searchInput = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "  test search  " } });

    expect(setSearchTermMock).toHaveBeenCalledWith("test search");
  });
});
