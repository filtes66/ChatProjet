import React from "react";
import { Link } from "react-router-dom";
//import { FaHome, FaShoppingCart } from "react-icons/fa";
import "../Styles/Header.css";

function Header() {
  return (
    <>
      <nav>
        <ul className="header__nav">
          <li className="header__icon">
            <Link to="/Register" className="header__item">
              Register
            </Link>
          </li>
          <li>
            <Link to="/Login" className="header__item">
              Login
            </Link>
          </li>
          <li>
            <Link to="/Chat" className="header__item">
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
