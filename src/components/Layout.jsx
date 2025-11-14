import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        CESA · Sistema Integral de Infracciones · {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;