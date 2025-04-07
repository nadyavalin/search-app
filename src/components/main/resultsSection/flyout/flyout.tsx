import styles from "./styles.module.css";
import { useSelectedItems } from "../selectedItemsContext/selectedItemsContext";

export const Flyout = () => {
  const { selectedItems, setSelectedItems } = useSelectedItems();

  const handleUnselectAll = () => {
    setSelectedItems([]);
  };

  if (selectedItems.length === 0) {
    return null;
  }

  const handleDownload = () => {
    const csv = selectedItems.map((row) => Object.values(row).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = `${selectedItems.length}_people.csv`;
    link.click();
  };

  return (
    <div className={styles.flyout}>
      <p>You have selected {selectedItems.length} items.</p>
      <div className={styles.flyoutButtons}>
        <button onClick={handleUnselectAll}>Unselect All</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};
