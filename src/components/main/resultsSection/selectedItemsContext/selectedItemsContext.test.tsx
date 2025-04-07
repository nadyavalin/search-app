import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { SelectedItemsProvider, useSelectedItems } from "./selectedItemsContext";
import { IPerson } from "../../../../types/types";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

interface TestComponentProps {
  person: IPerson;
}

const TestComponent = ({ person }: TestComponentProps) => {
  const { selectedItems, setSelectedItems } = useSelectedItems();

  const toggleSelect = () => {
    if (selectedItems.some((p) => p.name === person.name)) {
      setSelectedItems(selectedItems.filter((p) => p.name !== person.name));
    } else {
      setSelectedItems([...selectedItems, person]);
    }
  };

  return (
    <div>
      <span>{person.name}</span>
      <span data-testid="is-selected">
        {selectedItems.some((p) => p.name === person.name) ? "Selected" : "Not Selected"}
      </span>
      <button data-testid="toggle-button" onClick={toggleSelect}>
        Toggle Select
      </button>
    </div>
  );
};

describe("SelectedItemsContext", () => {
  const person: IPerson = {
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
  };

  const renderWithProvider = (ui: ReactNode) =>
    render(<SelectedItemsProvider>{ui}</SelectedItemsProvider>);

  test("initial selectedItems is empty", () => {
    renderWithProvider(<TestComponent person={person} />);

    const status = screen.getByTestId("is-selected");

    expect(status).toHaveTextContent("Not Selected");
  });

  test("selecting and deselecting items works correctly", () => {
    renderWithProvider(<TestComponent person={person} />);

    const toggleButton = screen.getByTestId("toggle-button");
    const status = screen.getByTestId("is-selected");

    userEvent.click(toggleButton);
    expect(status).toHaveTextContent("Selected");

    userEvent.click(toggleButton);
    expect(status).toHaveTextContent("Not Selected");
  });
});
