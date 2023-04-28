import React, { useState, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";

import Logo from "../assets/logo.jsx";
import Scale from "../assets/scale.jsx";
import Dumbbell from "../assets/dumbbell.jsx";
import User from "../assets/user.jsx";
import SignOut from "../assets/signout.jsx";
import Hamburger from "../assets/hamburger.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";

const svgValueDeskTop = 64;

const svgValueMobile = 64;

const Layout = () => {
  const [theme, setTheme] = useState("dark-mode");

  const impactRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [mobile, setMobileOpen] = useState(false);

  const changeTheme = () => {
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

  useOutsideClick(impactRef, () => setOpen(false));

  const handleLogOutClick = () => {
    setOpen(false);
  };

  const handleMobileClick = () => {
  setMobileOpen(false)
}

  const ProfileDropDown = () => {
    return (
      <>
        <div ref={impactRef} className="popup">
          <span className="full-width" onClick={() => setOpen(false)}>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive
                  ? "active-link full-width padding-sm"
                  : "inactive-link full-width padding-sm"
              }
            >
              Profile
            </NavLink>
          </span>
          <span className="flex aic padding-sm" onClick={handleLogOutClick}>
            Log Out
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <nav className=" full-width height-sm padding-sm flex aic space-between border-bottom-secondary body-color wrap desktop">
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <Logo value={svgValueDeskTop} />
        </NavLink>
        <NavLink
          to="/workoutInfo"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <Dumbbell value={svgValueDeskTop} />
        </NavLink>
        <label className="switch">
          <input type="checkbox" aria-label="Change Color Theme" />
          <span className="slider round" onClick={changeTheme}></span>
        </label>
        <NavLink
          to="/weight"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          <Scale value={svgValueDeskTop} />
        </NavLink>
        <div>
          <span onClick={() => setOpen(true)}>
            <User value={svgValueDeskTop} />
          </span>
          {open ? (
            <>
              <ProfileDropDown />
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
      {mobile ? (
        <>
          <nav className=" flex aic space-between body-color wrap mobile modal border light-bg-color">
            <div className="modal">
              <span
                className="modal-cancel heading-md"
                onClick={() => setMobileOpen(false)}
              >
                X
              </span>
              <div className="modal-content">
                <NavLink
                  to="/"
                  onClick={handleMobileClick}
                  aria-label="Home"
                  className={({ isActive }) =>
                    isActive
                      ? "active-link full-width"
                      : "inactive-link full-width"
                  }
                >
                  <Logo value={svgValueMobile} />
                  Home
                </NavLink>
                <NavLink
                  to="/workoutInfo"
                  onClick={handleMobileClick}
                  className={({ isActive }) =>
                    isActive
                      ? "active-link full-width"
                      : "inactive-link full-width"
                  }
                >
                  <Dumbbell value={svgValueMobile} />
                  Workout History
                </NavLink>

                <NavLink
                  to="/weight"
                  onClick={handleMobileClick}
                  className={({ isActive }) =>
                    isActive
                      ? "active-link full-width"
                      : "inactive-link full-width"
                  }
                >
                  <Scale value={svgValueMobile} />
                  Weight Tracker
                </NavLink>
                <NavLink
                  to="/account"
                  onClick={handleMobileClick}
                  className={({ isActive }) =>
                    isActive
                      ? "active-link full-width"
                      : "inactive-link full-width"
                  }
                >
                  <User value={svgValueMobile} />
                  Profile
                </NavLink>

                <span className="full-width">
                  <SignOut value={svgValueMobile} />
                  Log Out
                </span>
                <span>
                  <label className="switch">
                    <input type="checkbox" aria-label="Change Color Theme" />
                    <span className="slider round" onClick={changeTheme}></span>
                  </label>
                </span>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <div className="body-color mobile">
            <span onClick={() => setMobileOpen(true)}>
              <Hamburger value={svgValueMobile} />
            </span>
          </div>
        </>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
