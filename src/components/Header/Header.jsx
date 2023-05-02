import React from "react";
import "./Header.css";
function Header({ lives }) {
  function showTutorial() {
    alert(
      "Welcome to the game! Your objective is to click on all 12 cards without clicking on the same card twice. You have three lives to start with, and if you accidentally click on the same card twice, you will lose one life. If you lose all three lives, the game is over and you will have to start over again.To get started, simply click on any card to reveal what's behind it. You can then click on another card to reveal what's behind it, and so on. Remember, you can only click on each card once. If you successfully click on all 12 cards without losing all your lives, you win! Good luck and have fun playing the game!    "
    );
  }

  return (
    <div className="header">
      <p onClick={showTutorial} className="game-tut">
        ?
      </p>
      <h1>Memory Card Pokemon</h1>
      <h2>Lives: {lives}</h2>
    </div>
  );
}

export default Header;
