import { act, renderHook } from "@testing-library/react";
import { useSearchTermLocalStorage } from "./useSearchTermLocalStorage";
import { getItemFromLocalStorage } from "../utils/utils";
import * as localStorageUtils from "../utils/utils";

vi.mock("../utils/utils");

const getItemFromLocalStorageMock = vi.fn();
vi.spyOn(localStorageUtils, "getItemFromLocalStorage").mockImplementation(
  getItemFromLocalStorageMock,
);

describe("useSearchTermLocalStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize searchTerm with value from localStorage", async () => {
    getItemFromLocalStorageMock.mockReturnValue("initialSearchTerm");

    const { result } = renderHook(() => useSearchTermLocalStorage());

    expect(result.current.searchTerm).toBe("initialSearchTerm");

    expect(getItemFromLocalStorage).toHaveBeenCalledWith("searchTerm");
  });

  it("should initialize searchTerm with empty string if no value in localStorage", () => {
    getItemFromLocalStorageMock.mockReturnValue(null);

    const { result } = renderHook(() => useSearchTermLocalStorage());

    expect(result.current.searchTerm).toBe("");
    expect(getItemFromLocalStorage).toHaveBeenCalledWith("searchTerm");
  });

  it("should update searchTerm state", () => {
    const { result } = renderHook(() => useSearchTermLocalStorage());

    act(() => {
      result.current.setSearchTerm("newSearchTerm");
    });

    expect(result.current.searchTerm).toBe("newSearchTerm");
  });
});
