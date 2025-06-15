import { createBrowserRouter, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { VerifyProvider } from "../context/VerifyContext";
import PagesContainer from "../components/PagesContainer/PagesContainer";
import { usePageTitleFromRoute } from "../hooks/usePageTitleFromRoute";

// Lazy-load your page components for better performance.
// Components will only load when their routes are accessed.
const Connect = lazy(() => import("../pages/Connect/Connect"));
const Verify = lazy(() => import("../pages/Connect/VerifyEmail/Verify"));
const Products = lazy(() => import("../pages/Products/Products"));
const Subscription = lazy(() => import("../pages/Subscription/Subscription"));

// RootWrapper component wraps routes with context and Suspense fallback
function RootWrapper() {
  usePageTitleFromRoute();
  return (
    // Provide global Verify context to all children routes
    <VerifyProvider>
      {/* Suspense shows fallback UI while lazy components load */}
      <Suspense fallback={<PagesContainer loading />}>
        {/* Outlet renders the matched child route */}
        <Outlet />
      </Suspense>
    </VerifyProvider>
  );
}

// Define your routes with createBrowserRouter
export const router = createBrowserRouter([
  {
    path: "/", // Root path of your app
    element: <RootWrapper />, // Wrap all routes inside RootWrapper
    children: [
      // Index route, renders when path is exactly "/"
      {
        index: true,
        element: <Connect />,
        handle: { title: "Connect" },
      },

      // Route for verifying email, path = "/verify"
      {
        path: "verify",
        element: <Verify />,
        handle: { title: "Verify Email" },
      },

      // Protected route for subscription plans, path = "/products"
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
        handle: { title: "Choose Your Plan" },
      },

      // Protected route for subscription confirmation page, path = "/congrats"
      {
        path: "congrats",
        element: (
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        ),
        handle: { title: "Subscription Confirmed" },
      },

      // Catch-all route for unknown paths, fallback to Connect page
      { path: "*", element: <Connect />, handle: { title: "Connect" } },
    ],
  },
]);
