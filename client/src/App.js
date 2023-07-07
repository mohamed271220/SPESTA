import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/components/Layout/MainLayout";
import Home from "./Home/pages/Home";
import Categories from "./Category/Pages/Categories";
import Category from "./Category/Pages/Category";
import Product from "./Products/pages/Product";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Profile from "./Profile/pages/Profile";
import Secondary from "./shared/components/Layout/Secondary";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
     
      {
        path: "/categories",
        children: [
          { index: true, element: <Categories /> },
          {
            path: ":categoryId",
            element: <Category />,
          },
        ],
      },
      {
        path: "/products/:productId",
        element: <Product />,
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
            element: <Profile/>,
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
  {
    path: "/auth", 
    element: <Secondary/>,
    children:[
      {
        path:"login",
        element:<Login/>
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
