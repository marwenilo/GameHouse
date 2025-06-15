import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // Handles routing
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // React Query for server state management
import { router } from "./routes"; // App routes
import "./styles/global.css"; // Global styles

// Create a new instance of QueryClient for React Query
const queryClient = new QueryClient();

// Render the root of the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Provide the React Query context to the app */}
    <QueryClientProvider client={queryClient}>
      {/* Provide the React Router context to the app */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
