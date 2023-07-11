import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar isNonMobile drawerWidth="250px" isSidebarOpen setIsSidebarOpen />
      <Box>
        <Navbar isSidebarOpen setIsSidebarOpen />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
