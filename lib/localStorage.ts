export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    // Check for window object (client-side only)
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null; // Parse JSON if it exists
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return null;
    }
  }
  return null; // Return null for server-side rendering
};

export const setItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    // Check for window object (client-side only)
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    // Check for window object (client-side only)
    localStorage.removeItem(key);
  }
};
