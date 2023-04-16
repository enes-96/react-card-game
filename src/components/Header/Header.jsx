import React from "react";
import "./Header.css";
function Header({ lives }) {
  return (
    <div className="header">
      <h1>Memory Card Pokemon</h1>
      <h2>Lives: {lives}</h2>
    </div>
  );
}

export default Header;
