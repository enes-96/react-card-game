import "./App.css";
import { useState, useEffect } from "react";

const API_Key = "https://pokeapi.co/api/v2/";

async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1; // Get a random Pokemon ID between 1 and 898 (the total number of Pokemon in the PokeAPI)
  const response = await fetch(`${API_Key}pokemon/${randomId}`);
  const data = await response.json();
  return data;
}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 12; i++) {
        const pokemon = await fetchRandomPokemon();
        data.push(pokemon);
      }
      setPokemonData(shuffleArray(data)); // shuffle the initial order of the cards
    }
    fetchData();
  }, []);

  function handleCardClick(index) {
    if (clickedCards.includes(index)) {
      alert("You already clicked this card!");
    } else {
      const newClickedCards = [...clickedCards, index];
      setClickedCards(newClickedCards);
      const shuffledData = shuffleArray([...pokemonData]); // create a new array with the same elements as pokemonData and shuffle it
      setPokemonData(shuffledData);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Memory Card Pokemon</h1>
      </div>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon, index) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handleCardClick(index)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
