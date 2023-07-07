import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Logo";

const Secondary = () => {
  return (
    <div>
      <div className="secondary-nav">
        <Logo />
      </div>
      <Outlet />
    </div>
  );
};

export default Secondary;
