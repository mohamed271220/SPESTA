import React from "react";
import "./Footer.css";
import Logo from "../Logo";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="first-section">
        <Logo />
        <div className="support">
          <h3>Support the creator</h3>
          <div>
            <p>
              <Link>Facebook</Link>
            </p>
            <p>
              <Link>Linkedin</Link>
            </p>
            <p>
              <Link>Twitter</Link>
            </p>
            <p>
              <Link>Github</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="second-section">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
