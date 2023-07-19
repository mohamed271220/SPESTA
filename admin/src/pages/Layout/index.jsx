import React, { useContext, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { authActions } from "../../state/authSlice";
import { useDispatch } from "react-redux";
import { useGetAdminDataQuery, useGetUserQuery } from "../../state/api";

const Layout = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const data = useSelector((state) => state.auth.data);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (!storedData) {
      dispatch(authActions.logout());
      navigate("/");
    }
  },[dispatch, navigate]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
