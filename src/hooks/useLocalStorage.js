import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Return parsed JSON if valid, otherwise return the item itself or initialValue
      if (item) {
        try {
          return JSON.parse(item);
        } catch {
          // If it's not valid JSON, return the string value
          return item;
        }
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Store as JSON string only if it's an object/array, otherwise store as is
      const valueToStore = typeof storedValue === 'object' 
        ? JSON.stringify(storedValue) 
        : storedValue;
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}