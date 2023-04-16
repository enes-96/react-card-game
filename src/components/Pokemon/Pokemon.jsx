import React, { useState, useEffect } from "react";
import "./Cards.css";

const API_KEY = "https://pokeapi.co/api/v2/";

const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const response = await fetch(`${API_KEY}pokemon/${randomId}`);
  const data = await response.json();
  return { ...data, id: randomId };
};

const shuffleArray = (array) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function PokemonCards() {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        Array.from({ length: 9 }, () => fetchRandomPokemon())
      );
      setPokemonData(shuffleArray(data));
    };
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      setLives(lives - 1);
      if (lives === 1) {
        alert("Game over! You lost all your lives.");
        setLives(3);
        setClickedCards([]);
        setPokemonData(shuffleArray([...pokemonData]));
      } else {
        alert(
          `You already clicked this card! You have ${lives - 1} lives left.`
        );
      }
    } else {
      const newClickedCards = [...clickedCards, id];
      setClickedCards(newClickedCards);
      setPokemonData(shuffleArray([...pokemonData]));
      if (newClickedCards.length === pokemonData.length) {
        alert("YOU WON !!!!!!!!!!!!.");
        setLives(3);
        setClickedCards([]);
        setPokemonData(shuffleArray([...pokemonData]));
      }
    }
  };

  return (
    <div>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handleCardClick(pokemon.id)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
