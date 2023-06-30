import React from "react";
import { GoHome } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
// import "./NavLinks.css";
const NavLinks = () => {
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLinks>
            <GoHome />
            <p>Home</p>
          </NavLinks>
        </li>
        <li>
          <NavLinks>
            <BsPerson />
            <p>Profile</p>
          </NavLinks>
        </li>
        <li>
          <NavLinks>
            <BiCartAdd />
            <p>Cart</p>
          </NavLinks>
        </li>
        <li>
          <NavLinks>
            <AiOutlineMenu />
            <p>More</p>
          </NavLinks>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
