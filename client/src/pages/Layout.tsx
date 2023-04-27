import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import Logo from "../assets/logo.jsx";
import Scale from "../assets/scale.jsx";
import Dumbbell from "../assets/dumbbell.jsx";
import User from "../assets/user.jsx";

const Layout = () => {
  const [theme, setTheme] = useState("dark-mode");

  const handleClick = () => {
    const element = document.getElementById("App");
    if (theme === "dark-mode") {
      element?.classList.remove("dark-mode");
      setTheme("light-mode");
      element?.classList.add("light-mode");
    } else {
      element?.classList.remove("light-mode");
      setTheme("dark-mode");
      element?.classList.add("dark-mode");
    }
  };
  return (
    <>
      <nav className="full-width height-sm padding-lg flex aic space-between border-bottom-secondary body-color">
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
        >
          <Logo />
        </NavLink>
        <NavLink
          to="/workoutInfo"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
        >
          <Dumbbell />
        </NavLink>
        <label className="switch">
                <input type="checkbox" aria-label="Change Color Theme"/>
                <span className="slider round" onClick={handleClick}></span>
            </label>
        <NavLink
          to="/weight"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
        >
          <Scale />
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
        >
          <User />
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
