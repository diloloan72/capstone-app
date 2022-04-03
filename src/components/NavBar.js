import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

/*
 * Navigation bar component that contains the Home and About tab  
 */
function NavBar() {
  return (
    <div className="NavBar">
      <NavLink className="NavLink" activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink className="NavLink" activeClassName="active" to="/about">
        About
      </NavLink>
    </div>
  );
}
export default NavBar;
