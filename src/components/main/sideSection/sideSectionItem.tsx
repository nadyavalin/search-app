import Link from "next/link";
import styles from "./styles.module.css";
import { IPerson } from "../../../types/types";
import { cross } from "../../svg/svg";

interface PersonDetailsProp {
  person?: IPerson | null;
}

export function SideSectionItem({ person }: PersonDetailsProp) {
  return (
    <>
      <aside className={styles.sideSection} data-testid="side-section-item">
        <div className={styles.crossContainer}>
          <Link href="/" aria-label="Close" className={styles.cross}>
            <svg
              dangerouslySetInnerHTML={{ __html: cross }}
              width="22px"
              height="22px"
              viewBox="0 0 22 22"
              fill="none"
            />
          </Link>
        </div>

        <h2>Details</h2>
        <div>
          <h3>{person?.name}</h3>
        </div>
        <ul>
          <li>Birth year: {person?.birth_year}</li>
          <li>Eye color: {person?.eye_color}</li>
          <li>Gender: {person?.gender}</li>
          <li>Hair color: {person?.hair_color}</li>
          <li>Height: {person?.height}</li>
          <li>Mass: {person?.mass}</li>
          <li>Skin color: {person?.skin_color}</li>
          <li>Created: {person?.created}</li>
          <li>Edited: {person?.edited}</li>
        </ul>
      </aside>
    </>
  );
}
