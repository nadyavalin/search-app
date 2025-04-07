import { render, screen } from "@testing-library/react";
import { PeopleList } from "./peopleList";
import { SelectedItemsProvider } from "../selectedItemsContext/selectedItemsContext"; // Импортируем провайдер

describe("PeopleList component", () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(<SelectedItemsProvider>{ui}</SelectedItemsProvider>);
  };

  it("renders a list of people cards", () => {
    const people = [
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
    ];

    renderWithProvider(<PeopleList people={people} />);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
  });

  it("renders 'The list is empty' message if the array is empty", () => {
    renderWithProvider(<PeopleList people={[]} />);

    expect(screen.getByText("The list is empty")).toBeInTheDocument();
  });
});
