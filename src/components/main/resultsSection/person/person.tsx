import Link from "next/link";
import styles from "./styles.module.css";
import { IPerson } from "../../../../types/types";
import { useEffect, useState } from "react";
import { useSelectedItems } from "../selectedItemsContext/selectedItemsContext";

interface PersonProps {
  person: IPerson;
}

export const Person = ({ person }: PersonProps) => {
  const { selectedItems, setSelectedItems } = useSelectedItems();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedItems.some((item) => item.name === person.name));
  }, [selectedItems, person]);

  const handleCheckboxChange = () => {
    const newSelectedItems = isSelected
      ? selectedItems.filter((item) => item.name !== person.name)
      : [...selectedItems, person];

    setSelectedItems(newSelectedItems);
  };

  return (
    <Link key={person.name} href={`/${person.name}${location.search}`}>
      <li className={styles.resultsItem}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
        <p>&#10066; Name: {person.name}</p>
        <p className={styles.text}>Height: {person.height}</p>
        <p className={styles.text}>Mass: {person.mass}</p>
        <p className={styles.text}>Birth Year: {person.birth_year}</p>
      </li>
    </Link>
  );
};
