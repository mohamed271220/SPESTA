import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createMuiTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "./context/auth-context";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import axios from "axios";
let LogoutTimer;

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  //TODO AUTH LOGIC
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

  const auth = useContext(AuthContext);

  return (
    <div className="app">
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          data: data,
        }}
      >
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {auth.token ? (
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>

            ):(
              <Routes>
              
              <Route
                  path="/"
                  element={<Navigate to="/auth/Login" replace />}
                />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
            
            </Routes>
            ) }
          </ThemeProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
