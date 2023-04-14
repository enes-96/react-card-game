import "./App.css";
import { useState, useEffect } from "react";

const API_Key = "https://pokeapi.co/api/v2/";

async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1; // Get a random Pokemon ID between 1 and 898 (the total number of Pokemon in the PokeAPI)
  const response = await fetch(`${API_Key}pokemon/${randomId}`);
  const data = await response.json();
  return data;
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 12; i++) {
        const pokemon = await fetchRandomPokemon();
        data.push(pokemon);
      }
      setPokemonData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Memory Card Pokemon</h1>
      </div>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
