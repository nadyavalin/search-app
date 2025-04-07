import { ReactElement } from "react";
import styles from "./styles.module.css";

export const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer} data-testid="footer">
      <a href="https://github.com/nadyavalin" target="_blank" rel="noreferrer">
        nadyavalin GitHub
      </a>
    </footer>
  );
};
