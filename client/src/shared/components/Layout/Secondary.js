import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Logo";
import './index.css'
const Secondary = () => {
  return (
    <div>
      <div className="secondary-nav">
        <Logo mode={"secondary"} />
      </div>
      <Outlet />
    </div>
  );
};

export default Secondary;
