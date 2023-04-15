import "./App.css";
import { useState, useEffect } from "react";

const API_Key = "https://pokeapi.co/api/v2/";

async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const response = await fetch(`${API_Key}pokemon/${randomId}`);
  const data = await response.json();
  return { ...data, id: randomId };
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
  const [lives, setLives] = useState(3); // Initialize the number of lives to 3

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 12; i++) {
        const pokemon = await fetchRandomPokemon();
        data.push(pokemon);
      }
      setPokemonData(shuffleArray(data));
    }
    fetchData();
  }, []);

  function handleCardClick(id) {
    if (clickedCards.includes(id)) {
      setLives(lives - 1); // Reduce the number of lives by 1 if the card has already been clicked
      if (lives === 1) {
        alert("Game over! You lost all your lives.");
        setLives(3); // Reset the number of lives to 3 if the game is over
        setClickedCards([]); // Reset the clicked cards array
        const shuffledData = shuffleArray([...pokemonData]);
        setPokemonData(shuffledData);
        return;
      } else {
        alert(
          `You already clicked this card! You have ${lives - 1} lives left.`
        );
      }
    } else {
      const newClickedCards = [...clickedCards, id];
      setClickedCards(newClickedCards);
      console.log(clickedCards);
      const shuffledData = shuffleArray([...pokemonData]);
      setPokemonData(shuffledData);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Memory Card Pokemon</h1>
      </div>
      <div className="lives">
        <h2>Lives: {lives}</h2>
      </div>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handleCardClick(pokemon.id)}
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
