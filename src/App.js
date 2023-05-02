import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import PokemonCards from "./components/Pokemon/Pokemon";
function App() {
  const [lives, setLives] = useState(3);

  function handleGameOver() {
    alert("Game over! You lost all your lives.");
    setLives(3);
  }

  return (
    <div className="App">
      <Header />
      <PokemonCards lives={lives} onGameOver={handleGameOver} />
    </div>
  );
}

export default App;
