import React, { useEffect, useCallback, useState, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/components/Layout/MainLayout";
import Home from "./Home/pages/Home";
import Categories from "./Category/Pages/Categories";
import Tags from "./Tag/pages/Tags";
import Tag from "./Tag/pages/Tag";
import Category from "./Category/Pages/Category";
import Product from "./Products/pages/Product";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RequireAuth from "./auth/RequireAuth";
import Profile from "./Profile/pages/Profile";
import Secondary from "./shared/components/Layout/Secondary";

import axios from "axios";
import LoadingSpinner from "./shared/Loading/LoadingSpinner/LoadingSpinner";
import Cart from "./Cart/page/Cart";
import { useSelector } from "react-redux";
import { authActions } from "./shared/features/authSlice";
import { useDispatch } from "react-redux";
import Checkout from "./Cart/page/Checkout";
import ScrollToTop from "./shared/hooks/scroll-to-top";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

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
            element: <Tags />,
          },
          {
            path: ":tagId",
            element: <Tag />,
          },
        ],
      },
      {
        path: "/cart",
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
      {
        path: "/profile",
        children: [
          {
            index: true,
            element: <Profile />,
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
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "/auth",
    element: <Secondary />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
let LogoutTimer;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          userId: storedData.userId,
          token: storedData.token,
          data: storedData.data,
          expirationDate: new Date(storedData.expiration),
        })
      );
    }
  }, [dispatch]);
  var tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  useEffect(() => {
    const checkDate = async () => {
      try {
        if (tokenExpirationDate) {
          const remainingTime =
            new Date(tokenExpirationDate).getTime() - new Date().getTime();
          LogoutTimer = setTimeout(() => {
            dispatch(authActions.logout());
          }, remainingTime);
        } else {
          clearTimeout(LogoutTimer);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkDate();
  }, [dispatch, tokenExpirationDate]);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
// document.querySelector("#root > div.first-section")
