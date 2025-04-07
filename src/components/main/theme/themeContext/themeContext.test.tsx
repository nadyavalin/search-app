import React, { PropsWithChildren } from "react";
import { ThemeProvider, useTheme } from "./themeContext";
import { act, renderHook } from "@testing-library/react";

describe("ThemeContext", () => {
  it("should toggle theme between dark and light", () => {
    const wrapper: React.FC = ({ children }: PropsWithChildren) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current?.theme).toBe("dark");

    act(() => {
      result.current?.toggleTheme();
    });

    expect(result.current?.theme).toBe("light");

    act(() => {
      result.current?.toggleTheme();
    });

    expect(result.current?.theme).toBe("dark");
  });
});
