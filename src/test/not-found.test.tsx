import { render, screen } from "@testing-library/react";
import ErrorPage, { getStaticProps } from "../app/not-found";

describe("ErrorPage", () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });

  test("renders 404 message", () => {
    const errorMessage = screen.getByText(/404/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders sorry message", () => {
    const sorryMessage = screen.getByText(/Sorry, an unexpected error has occurred./i);
    expect(sorryMessage).toBeInTheDocument();
  });

  test("renders link back to main page", () => {
    const linkElement = screen.getByText(/Turn to main page!/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("renders the 404 image", () => {
    const imageElement = screen.getByAltText(/404/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", expect.stringContaining("404.jpg"));
  });

  test("image container has the correct data-testid", () => {
    const imageContainer = screen.getByTestId("404");
    expect(imageContainer).toBeInTheDocument();
  });
});

describe("getStaticProps", () => {
  it("should return the correct props", async () => {
    const result = await getStaticProps();
    expect(result).toEqual({
      props: {
        errorMessage: "Sorry, an unexpected error has occurred.",
      },
    });
  });
});
