import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";
import BottomMenu from "../Navigation/BottomMenu";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../hooks/scroll-to-top";

const MainLayout = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <BottomMenu />
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
