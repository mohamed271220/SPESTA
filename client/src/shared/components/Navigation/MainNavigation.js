import React from "react";
import MainHeader from "./MainHeader";

const MainNavigation = () => {
  return (
    <>
      <MainHeader>
        <div>logo</div>
        <input>Search bar</input>
        <div> deliver to some location tech </div>
        <div>some pull down menu for accounts and NAVLINKS</div>
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav">
        <div> deliver to some location tech </div>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
