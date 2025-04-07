import { render } from "@testing-library/react";
import { ThemeProvider } from "../components/main/theme/themeContext/themeContext";
import RootLayout from "../app/layout";

vi.mock("../components/header/header", () => ({
  Header: () => <div>Mock Header</div>,
}));

vi.mock("../components/footer/footer", () => ({
  Footer: () => <div>Mock Footer</div>,
}));

test("renders RootLayout with Header, children and Footer", () => {
  const { getByText } = render(
    <ThemeProvider>
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>
    </ThemeProvider>,
  );

  expect(getByText("Mock Header")).toBeInTheDocument();
  expect(getByText("Test Children")).toBeInTheDocument();
  expect(getByText("Mock Footer")).toBeInTheDocument();
});
