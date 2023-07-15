import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createMuiTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Suspense,
} from "react";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/Products";
import Users from "./pages/Users";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./state/authSlice";
import LoadingSpinner from "./Components/Loading/LoadingSpinner/LoadingSpinner";


axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

let logoutTimer;

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

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
          logoutTimer = setTimeout(() => {
            dispatch(authActions.logout());
          }, remainingTime);
        } else {
          clearTimeout(logoutTimer);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkDate();
  }, [dispatch, tokenExpirationDate]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/users" element={<Users />} />
              </Route>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
