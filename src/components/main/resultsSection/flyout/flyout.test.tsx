import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SelectedItemsProvider,
  useSelectedItems,
} from "../selectedItemsContext/selectedItemsContext";
import { Flyout } from "./flyout";
import { IPerson } from "../../../../types/types";

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<SelectedItemsProvider>{ui}</SelectedItemsProvider>);
};

const setup = () => {
  const person: IPerson = {
    name: "Han Solo",
    birth_year: "29BBY",
    eye_color: "brown",
    gender: "male",
    hair_color: "brown",
    height: "180",
    mass: "80",
    skin_color: "fair",
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
  };

  const ComponentWithState = () => {
    const { setSelectedItems } = useSelectedItems();
    React.useEffect(() => {
      setSelectedItems([person, person]);
    }, [setSelectedItems]);
    return <Flyout />;
  };

  return renderWithProvider(<ComponentWithState />);
};

describe("Flyout", () => {
  test("renders when selectedItems are present", () => {
    setup();
    expect(screen.getByText(/You have selected/)).toBeInTheDocument();
  });

  test("does not render when selectedItems are empty", () => {
    renderWithProvider(<Flyout />);
    expect(screen.queryByText(/You have selected/)).not.toBeInTheDocument();
  });

  test("Unselect All button clears selectedItems", () => {
    setup();
    const unselectButton = screen.getByText(/Unselect All/);
    fireEvent.click(unselectButton);
    expect(screen.queryByText(/You have selected/)).not.toBeInTheDocument();
  });

  test("Download button creates and clicks a download link with csv", () => {
    setup();
    const downloadButton = screen.getByText(/Download/);

    const createElementSpy = vi.spyOn(document, "createElement");
    const blob = new Blob([""], { type: "text/csv" });
    const link = { click: vi.fn() } as unknown as HTMLAnchorElement;

    createElementSpy.mockReturnValue(link);
    URL.createObjectURL = vi.fn().mockReturnValue(blob);

    fireEvent.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(link.download).toBe("2_people.csv");
    expect(link.click).toHaveBeenCalled();

    createElementSpy.mockRestore();
  });
});
