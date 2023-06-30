import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";
import NavLinks from "../Navigation/NavLinks";

const MainLayout = () => {
  return (
    <>
      <MainNavigation />

      <main>
        <Outlet />
      </main>
      <NavLinks />
    </>
  );
};

export default MainLayout;
