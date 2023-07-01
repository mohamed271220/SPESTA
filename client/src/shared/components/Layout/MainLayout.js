import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";
import BottomMenu from "../Navigation/BottomMenu";

const MainLayout = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <BottomMenu />
    </React.Fragment>
  );
};

export default MainLayout;
