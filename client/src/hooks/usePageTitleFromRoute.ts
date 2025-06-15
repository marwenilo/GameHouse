import { useMatches } from "react-router-dom"; // Hook to get all matched routes
import { useEffect } from "react";

// Type definition for routes that include a `title` in their handle
type HandleWithTitle = {
  title?: string;
};

// Custom hook that sets the document title based on the current route
export function usePageTitleFromRoute() {
  const matches = useMatches(); // Get all route matches for the current location

  useEffect(() => {
    // Find the last matched route that includes a `title` in its handle
    const lastMatchWithTitle = [...matches]
      .reverse() // Start from the deepest route
      .find((m) => (m.handle as HandleWithTitle)?.title); // Check if the route has a `title`

    if (lastMatchWithTitle) {
      // If a title is found, set it as the document title
      document.title = (lastMatchWithTitle.handle as HandleWithTitle).title!;
    }
  }, [matches]); // Re-run this effect whenever the route matches change
}
