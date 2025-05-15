import { useEffect, useState } from "react";

// Defining types for the input parameters enhances maintainability and developer experience
export default function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts or values change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Ensure effect re-runs only if value or delay changes

  return debouncedValue;
}
