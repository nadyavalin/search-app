import { ReactElement } from "react";

export const Header = (): ReactElement => {
  return (
    <header className="header" data-testid="header">
      <h1>Search Star Wars People</h1>
    </header>
  );
};
