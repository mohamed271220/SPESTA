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
import { AuthContext } from "./context/auth-context";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./state/authSlice";
import LoadingSpinner from "./Components/Loading/LoadingSpinner/LoadingSpinner";
let LogoutTimer;

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  //TODO AUTH LOGIC
  // const [token, setToken] = useState(false);
  // const [userId, setUserId] = useState(null);
  // const [data, setData] = useState(null);
  // const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // const login = useCallback((userId, token, data, expirationDate) => {
  //   setToken(token);
  //   setUserId(userId);
  //   setData(data);
  //   const tokenExpirationDate =
  //     expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  //   setTokenExpirationDate(tokenExpirationDate);
  //   localStorage.setItem(
  //     "userData",
  //     JSON.stringify({
  //       userId: userId,
  //       token: token,
  //       data: data,
  //       expiration: tokenExpirationDate.toISOString(),
  //     })
  //   );
  // }, []);
  // const logout = useCallback(() => {
  //   setToken(null);
  //   setTokenExpirationDate(null);
  //   setUserId(null);
  //   setData(null);
  //   localStorage.removeItem("userData");
  // }, []);
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
  let logoutTimer;
  var tokenExpirationDate =  useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  useEffect(() => {
    if (tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        dispatch(authActions.logout());
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [dispatch]);

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
