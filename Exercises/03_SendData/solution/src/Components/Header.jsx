import React from "react";

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
        <a className="navbar-brand" href="/">
          QA Todo App
        </a>
      </nav>
    </header>
  );
};

export default Header;
