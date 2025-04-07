import { render, screen, fireEvent } from "@testing-library/react";
import { IPerson } from "../../../../types/types";
import { Person } from "./person";
import { SelectedItemsProvider } from "../selectedItemsContext/selectedItemsContext";

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

describe("Person Component", () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(<SelectedItemsProvider>{ui}</SelectedItemsProvider>);
  };

  it("renders correctly with the given person data", () => {
    renderWithProvider(<Person person={person} />);

    expect(screen.getByText(/Name: Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
  });

  it("checkbox interaction works correctly - selects the item", () => {
    renderWithProvider(<Person person={person} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("checkbox interaction works correctly - deselects the item", () => {
    renderWithProvider(<Person person={person} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
