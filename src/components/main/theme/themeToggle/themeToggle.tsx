import { useEffect } from "react";
import styles from "./styles.module.css";
import { useTheme } from "../themeContext/themeContext";

export const ThemeToggle = () => {
  const themeContext = useTheme();

  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);

  return (
    <div className={styles.toggleThemeButton}>
      <button onClick={toggleTheme}>Toggle Theme to {theme === "dark" ? "Light" : "Dark"}</button>
    </div>
  );
};
