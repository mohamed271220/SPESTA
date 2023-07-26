import React, { useContext, useEffect, useState } from "react";
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

import axios from "axios";
import SearchBar from "./SearchBar";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/authSlice";
import { cartActions } from "../../features/cartSlice";
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
  const [tags, setTags] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const getTags = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tags");
        const data = await response.json();
        setTags(data.data);
        const response2 = await fetch(
          "http://localhost:8080/api/admin/dashboard/products"
        );
        const data2 = await response2.json();
        setSearchData(data2.products);
        // console.log(data2);
        setLoading(false);
        // console.log(data);
      } catch (err) {}
      setLoading(false);
    };
    setLoading(false);
    getTags();
  }, []);

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
    dispatch(authActions.logout());
  };

  //  console.log(auth.data)
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.auth.data);
console.log(data);
  

  // const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const update = async () => {
  //     const response = await axios.post(
  //       `http://localhost:8080/api/product/${._id}/cart`,
  //       { number: 1 }
  //     );
  //   };
  //   update()
  // }, []);

  return (
    <React.Fragment>
      {!Loading && (
        <>
          <Link to={"/cart"} className="cart-floating">
            <LiaCartPlusSolid /> {cartQuantity}
          </Link>
          <MainHeader>
            <Link to="/" className="main-navigation__logo">
              <Logo />
            </Link>
            <div className="main-navigation__location">
              <div>
                <IconContext.Provider
                  value={{ color: "white", className: "icon" }}
                >
                  <div>
                    <IoLocationOutline />
                  </div>
                </IconContext.Provider>
                <div className="main-navigation__location-text">
                  <p className="main-navigation__location-text-dimmed">
                    Location
                  </p>
                  <p>Egypt</p>
                </div>
              </div>
            </div>
            {searchData && !Loading && (
              <SearchBar
                className="main-navigation__search"
                // element="input"
                // type="text"
                // id="search"
                data={searchData}
                placeholder={`Search...`}
              />
            )}
            {token && (
              <Link to={"/profile"}>
                <img
                  className="main-navigation__user-img"
                  src={"http://localhost:8080/" + data.image}
                  alt={data.name}
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
                  {token ? "hello " + data.name : "Hello & sign in"}
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
                  <DropdownItem
                    to={"/profile"}
                    img={<BsPerson />}
                    text={"My Profile"}
                  />
                  <DropdownItem to={"/"} img={<GoHome />} text={"Home"} />

                  <DropdownItem
                    to={"/categories"}
                    img={""}
                    text={"Categories"}
                  />
                  {token && (
                    <DropdownItem to={"/profile"} img={""} text={"Orders"} />
                  )}
                  {token && (
                    <DropdownItem
                      to={"/cart"}
                      img={<BiCartAdd />}
                      text={"Cart"}
                    />
                  )}
                  {!token ? (
                    <DropdownItem to={"/auth/login"} img={""} text={"Login"} />
                  ) : (
                    <DropdownItem
                      to={""}
                      img={""}
                      text={"Logout"}
                      onClick={logoutHandler}
                    />
                  )}
                </ul>
              </div>
            </div>
          </MainHeader>
          <MainHeader className="secondary main-navigation__header-nav">
            <div className="main-navigation__location-mobile">
              <IconContext.Provider
                value={{ color: "white", className: "icon" }}
              >
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
              {tags &&
                tags
                  .map((tag, index) => (
                    <Link key={tag._id} to={`tags/${tag._id}`}>
                      {tag.name}
                    </Link>
                  ))
                  .sort(() => (Math.random() > 0.5 ? 1 : -1))
                  .slice(0, 5)}
            </div>
          </MainHeader>
        </>
      )}
    </React.Fragment>
  );
};

export default MainNavigation;
