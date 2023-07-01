import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import "./index.css";
const NavLinks = () => {
  return (
<div className="nav-links-container">
      <ul className="nav-links">
        <li>
          <NavLink>
            <GoHome />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <BsPerson />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <BiCartAdd />
            <p>Cart</p>
          </NavLink>
        </li>
        <li>
          <NavLink>
            <AiOutlineMenu />
            <p>More</p>
          </NavLink>
        </li>
      </ul>
</div>
 
  );
};

export default NavLinks;
