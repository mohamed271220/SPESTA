import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";

function DropdownItem(props) {
  if (props.text === "Logout") {
    return (
      <li className="dropdownItem">
        <button onClick={props.onClick}>
          {" "}
          {props.img} {props.text}
        </button>
      </li>
    );
  }

  return (
    <li className="dropdownItem">
      <NavLink to={props.to}>
        {" "}
        {props.img} {props.text}{" "}
      </NavLink>
    </li>
  );
}

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  let menuRef = React.useRef();

  React.useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logoutHandler = () => {
    auth.logout();
  };

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
        {auth.token && (
          <Link to={"/profile"}>
            <img
              className="main-navigation__user-img"
              src={"http://localhost:8080/" + auth.data.image}
              alt={auth.data.name}
            />{" "}
          </Link>
        )}{" "}
        {/* pull down menu  */}
        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <p className="main-navigation__location-text-dimmed menu-small">
              {auth.token ? "hello " + auth.data.name : "Hello & sign in"}
            </p>
            <p>Account & List</p>
          </div>

          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <h3>
              Welcome
              <br />
              <span>Some acc name</span>
            </h3>
            <ul>
              <DropdownItem to={"/profile"} img={<BsPerson />} text={"My Profile"} />
              <DropdownItem to={"/"} img={<GoHome />} text={"Home"} />

              <DropdownItem to={"/categories"} img={""} text={"Categories"} />
              {auth.token && <DropdownItem to={""} img={""} text={"Orders"} />}
              {auth.token && (
                <DropdownItem to={""} img={<BiCartAdd />} text={"Cart"} />
              )}
              {!auth.token ? (
                <DropdownItem to={"/auth/login"} img={""} text={"Login"} />
              ) : (
                <DropdownItem to={""} img={""} text={"Logout"} onClick={logoutHandler} />
              )}
            </ul>
          </div>
        </div>
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav">
        <div className="main-navigation__location-mobile">
          <IconContext.Provider value={{ color: "white", className: "icon" }}>
            <div>
              <IoLocationOutline />
            </div>
          </IconContext.Provider>
          <p className="main-navigation__location-text-dimmed">
            Delivery to{" "}
            <span className="main-navigation__location-text-location">
              Egypt🥲
            </span>
          </p>
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
