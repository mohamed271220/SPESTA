import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";
import BottomMenu from "../Navigation/BottomMenu";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <BottomMenu />
      <Footer />
    </React.Fragment>
  )
};

export default MainLayout;
