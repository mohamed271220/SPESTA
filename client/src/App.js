import React, { useEffect, useCallback, useState, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/components/Layout/MainLayout";
import Home from "./Home/pages/Home";
import Categories from "./Category/Pages/Categories";
import Category from "./Category/Pages/Category";
import Product from "./Products/pages/Product";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import RequireAuth from "./auth/RequireAuth";
import Profile from "./Profile/pages/Profile";
import Secondary from "./shared/components/Layout/Secondary";
import { AuthContext } from "./shared/context/auth-context";
import axios from "axios";
import LoadingSpinner from "./shared/Loading/LoadingSpinner/LoadingSpinner";
import Cart from "./Cart/page/Cart";

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
            element: <div>Tags</div>,
          },
          {
            path: ":tagId",
            element: <div>Single Tag</div>,
          },
        ],
      },
      {
        path: "/cart",
        children: [
          {
            index: true,
            element: <Cart/>,
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
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((userId, token, data, expirationDate) => {
    setToken(token);
    setUserId(userId);
    setData(data);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        data: data,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setData(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.data,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      LogoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(LogoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        data: data,
        login,
        logout,
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
// document.querySelector("#root > div.first-section")