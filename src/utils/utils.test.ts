import { setItemToLocalStorage, getItemFromLocalStorage } from "./utils";

describe("localStorageUtils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("setItemToLocalStorage should store the value correctly in localStorage", () => {
    const key = "testKey";
    const value = { name: "Test User", age: 45 };

    setItemToLocalStorage(key, value);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it("getItemFromLocalStorage should retrieve the value correctly from localStorage", () => {
    const key = "testKey";
    const value = { name: "Test User", age: 45 };
    localStorage.setItem(key, JSON.stringify(value));

    const retrievedValue = getItemFromLocalStorage<{ name: string; age: number }>(key);

    expect(retrievedValue).toEqual(value);
  });

  it("getItemFromLocalStorage should return null if the key does not exist", () => {
    const key = "nonExistingKey";

    const retrievedValue = getItemFromLocalStorage<{ name: string; age: number }>(key);

    expect(retrievedValue).toBeNull();
  });

  it("getItemFromLocalStorage should return null if the stored value is invalid JSON", () => {
    const key = "invalidKey";
    localStorage.setItem(key, "invalid JSON");

    const retrievedValue = getItemFromLocalStorage<{ name: string; age: number }>(key);

    expect(retrievedValue).toBeNull();
  });
});
