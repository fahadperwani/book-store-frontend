import React, { useEffect, useState } from "react";
import userimg from "../images/user.png";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserAuth } from "../context/AuthContext";
import "../styles/Nav.css";

function Nav() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { user } = useUserAuth();

  function handleMode() {
    const htmlEl = document.querySelector("html");
    if (darkMode) {
      htmlEl.classList.remove("dark");
      setDarkMode(false);
    } else {
      htmlEl.classList.add("dark");
      setDarkMode(true);
    }
  }
  return (
    <>
      <nav className={showNav ? "shownav" : " "}>
        <div className="user">
          <img src={user?.img || userimg} referrerPolicy="no-referrer" alt="" />
          <Link className="link" to="/login">
            <div className="user-info">
              <p className="user-name">{user?.name || "User"}</p>
              <p className="user-plan">{user?.plan ? user.plan : "No Plan"}</p>
            </div>
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-items">
            <Link className="link" to="/">
              Explore
              <FaAngleRight className="icon" />
            </Link>
          </li>
          <li className="nav-items">
            <Link className="link" to="/categories">
              Categories
              <FaAngleRight className="icon" />
            </Link>
          </li>
          <li className="nav-items">
            <Link className="link" to="/plans">
              Book Plans
              <FaAngleRight className="icon" />
            </Link>
          </li>
          <li className="nav-items">
            <Link className="link" to="/cart">
              Cart
              <FaAngleRight className="icon" />
            </Link>
          </li>
          <li className="nav-items">
            <Link className="link" to="/aboutme">
              About me
              <FaAngleRight className="icon" />
            </Link>
          </li>
        </ul>
        <button className="toggle-mode" onClick={handleMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <FaTimes className="cross" onClick={() => setShowNav(false)} />
      </nav>
      <GiHamburgerMenu className="hamburger" onClick={() => setShowNav(true)} />
    </>
  );
}

export default Nav;
