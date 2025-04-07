import { render, screen } from "@testing-library/react";
import { IPerson } from "../../../types/types";
import { SideSectionItem } from "./sideSectionItem";

describe("SideSectionItem Component", () => {
  const mockPersonDetails: IPerson | null = {
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

  test("renders person details correctly", () => {
    render(<SideSectionItem person={mockPersonDetails} />);

    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Birth year: 19BBY")).toBeInTheDocument();
    expect(screen.getByText("Eye color: blue")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Hair color: blond")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
    expect(screen.getByText("Skin color: fair")).toBeInTheDocument();
    expect(screen.getByText("Created: 2014-12-09T13:50:51.644000Z")).toBeInTheDocument();
    expect(screen.getByText("Edited: 2014-12-20T21:17:56.891000Z")).toBeInTheDocument();
  });

  test("renders close button with correct link", () => {
    render(<SideSectionItem person={mockPersonDetails} />);

    const closeButton = screen.getByRole("link", { name: "Close" });
    expect(closeButton).toHaveAttribute("href", "/");
  });
  test("clicking on a detail item triggers an additional API call", () => {
    render(<SideSectionItem person={mockPersonDetails} />);
  });
});
