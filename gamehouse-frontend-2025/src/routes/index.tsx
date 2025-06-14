import { createBrowserRouter } from "react-router-dom";
import Connect from "../pages/Connect/Connect";
import Verify from "../pages/Connect/VerifyEmail/Verify";
import Products from "../pages/Products/Products";
import Subscription from "../pages/Subscription/Subscription";

export const router = createBrowserRouter([
  { path: "/", element: <Connect /> },
  { path: "/verify", element: <Verify /> },
  { path: "/plans", element: <Products /> },
  { path: "/congrats", element: <Subscription /> },
]);
