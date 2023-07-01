import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/components/Layout/MainLayout";
import Home from "./Home/pages/Home"
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "/categories",
        children: [
          { index: true, element: <div>Category</div> },
          {
            path: ":categoryId",
            element: <div>Category</div>,
          },
        ],
      },
      {
        path: "/products/:productId",
        element: <div>Product</div>,
      },
      {
        path: "/tags",
        children: [
          {
            index: true,
            element: <div>Tags</div>,
          },
          {
            path: ":tagId",
            element: <div>Single Tag</div>,
          },
        ],
      },
      {
        path: "/auth",
        element: <div>Auth spa page</div>,
      },
      {
        path: "/cart",
        children: [
          {
            index: true,
            element: <div>Cart</div>,
          },
          {
            path: "checkout",
            element: <div>Checkout</div>,
          },
        ],
      },
      {
        path: "/profile",
        children: [
          {
            index: true,
            element: <div>Profile</div>,
          },
          {
            path: "orders",
            element: <div>Orders</div>,
          },
          {
            path: "addresses",
            element: <div>Addresses</div>,
          },
          {
            path: "payment-methods",
            element: <div>Payment Methods</div>,
          },
          {
            path: "login-security",
            element: <div>security</div>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
