import { Metadata } from "next";
import "./styles.css";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "../components/main/theme/themeContext/themeContext";
import { SelectedItemsProvider } from "../components/main/resultsSection/selectedItemsContext/selectedItemsContext";

export const metadata: Metadata = {
  title: "Star Wars Search App",
  description: "Star Wars Search App",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <ThemeProvider>
        <SelectedItemsProvider>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </SelectedItemsProvider>
      </ThemeProvider>
    </html>
  );
}
