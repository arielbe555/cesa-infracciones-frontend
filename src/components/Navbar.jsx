import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">CESA</span>
        <span className="navbar-subtitle">Infracciones</span>
      </div>
      <div className="navbar-right">
        <NavLink to="/consultar" className="nav-link">
          Consultar infracciones
        </NavLink>
        <NavLink to="/admin" className="nav-link">
          Panel interno
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;