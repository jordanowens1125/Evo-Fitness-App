import React, { useState, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";

import Logo from "../assets/logo.jsx";
import Scale from "../assets/scale.jsx";
import Dumbbell from "../assets/dumbbell.jsx";
import User from "../assets/user.jsx";
import SignOut from "../assets/signout.jsx";
import Hamburger from "../assets/hamburger.jsx";
import Options from "../assets/options.jsx";
import useOutsideClick from "../hooks/useOutsideClick.jsx";
import { useLogOut } from "../hooks/useLogOut.js";
import useAuthContext from "../hooks/useAuthContext.js";

const svgValueDeskTop = 64;

const svgValueMobile = 64;

const Layout = () => {
  const [theme, setTheme] = useState("dark-mode");

  const { user } = useAuthContext();
  const { signOut } = useLogOut();

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
    signOut();
    setOpen(false);
  };

  const handleMobileClick = () => {
    setMobileOpen(false);
  };

  const ProfileDropDown = () => {
    return (
      <>
        <div ref={impactRef} className="popup flex-column aic jcc">
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
          <span className="full-width padding-sm">
            <NavLink
              to="/quicklinks"
              className={({ isActive }) =>
                isActive
                  ? "active-link full-width padding-sm"
                  : "inactive-link full-width padding-sm"
              }
            >
              Quick Links
            </NavLink>
          </span>
          <span className="full-width padding-sm flex aic jcc" onClick={handleLogOutClick}>
            <div>Log Out</div>
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      {user && (
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
              <span onClick={() => setOpen(true)} className="flex aic">
                {user && <>{user.email}</>}
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
              <nav className=" flex aic space-between body-color wrap mobile border light-bg-color">
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
                    <NavLink
                      to="/quicklinks"
                      onClick={handleMobileClick}
                      className={({ isActive }) =>
                        isActive
                          ? "active-link full-width"
                          : "inactive-link full-width"
                      }
                    >
                      <Options value={svgValueMobile} />
                      Quick Links
                    </NavLink>
                    <NavLink
                      to="/signin"
                      onClick={handleLogOutClick}
                      className={({ isActive }) =>
                        isActive
                          ? "active-link full-width"
                          : "inactive-link full-width"
                      }
                    >
                      <SignOut value={svgValueMobile} />
                      Log Out
                    </NavLink>
                    <span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          aria-label="Change Color Theme"
                        />
                        <span
                          className="slider round"
                          onClick={changeTheme}
                        ></span>
                      </label>
                    </span>
                  </div>
                </div>
              </nav>
            </>
          ) : (
            <>
              <div className="body-color mobile flex-end">
                <span onClick={() => setMobileOpen(true)}>
                  <Hamburger value={svgValueMobile} />
                </span>
              </div>
              {/* <button className="scroll-to-top" onClick={executeScroll}>Back To Top</button> */}
            </>
          )}
        </>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
