import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "./images/qa.jpeg";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          href="https://www.qa.com"
          className="navbar-brand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="QA Ltd" width="30" />
        </a>
        <Link className="navbar-brand" to="/">
          QA Todo App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <NavLink
                to="/"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Todos
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="/add"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Add Todo
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
