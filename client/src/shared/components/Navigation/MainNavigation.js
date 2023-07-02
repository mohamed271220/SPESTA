import React from "react";
import MainHeader from "./MainHeader";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons";
import { IoLocationOutline } from "react-icons/io5";
import Input from "../../FormElements/Input/Input";
const MainNavigation = () => {
  return (
    <React.Fragment>
      <MainHeader>
        <Link to="/" className="main-navigation__logo">
          <Logo />
        </Link>
        <div className="main-navigation__location">
          <div>
            <IconContext.Provider value={{ color: "white", className: "icon" }}>
              <div>
                <IoLocationOutline />
              </div>
            </IconContext.Provider>
            <div className="main-navigation__location-text">

            <p className="main-navigation__location-text-dimmed">Location</p>
            <p>Egypt</p>
            </div>
          </div>
        </div>
        <input
          className="main-navigation__search"
          element="input"
          type="text"
          id="search"
          placeholder={`Search Spesta`}
        />
       
        <Link to={'/profile'}>Account</Link>
        <div className="main-navigation__menu">PULL DOWN MENU</div>
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav">
        <div className="main-navigation__location-mobile">
          <IconContext.Provider value={{ color: "white", className: "icon" }}>
            <div>
              <IoLocationOutline />
            </div>
          </IconContext.Provider>
          <p className="main-navigation__location-text-dimmed">Delivery to <span className="main-navigation__location-text-location">Egypt</span></p>
        </div>
      
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav-port">
     <div className="tags">
      <Link>Tag #</Link>
      <Link>Tag #</Link>
      <Link>Tag #</Link>
      <Link>Tag #</Link>
      <Link>Tag #</Link>
      <Link>Tag #</Link>
      <Link>Tag #</Link>
     </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
