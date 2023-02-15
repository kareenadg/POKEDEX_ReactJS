import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    id: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
    weight: "",
    height: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon({
          name: pokemonName,
          id: res.data.id,
          image: res.data.sprites.other.dream_world.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
          weight: res.data.weight / 10,
          height: res.data.height / 10,
        });
        setPokemonChosen(true);
      });
  };

  return (
    <div className="App">
      <div className="titlebox">
        <h1>Pokédex</h1>
        <p>Gotta Catch 'Em All !</p>
        <input
          type="text"
          placeholder="Pokémon"
          onChange={(ev) => {
            setPokemonName(ev.target.value);
          }}
          value={pokemonName}
        />
        {pokemonName && <button onClick={searchPokemon}>Search 🔍</button>}
      </div>
      <div className="display">
        {pokemonChosen ? (
          <div className="pokecard">
            <div className="black">
              <h1>
                {pokemon.name.toLocaleUpperCase()} #{pokemon.id}
              </h1>
            </div>
            <div className="pokemonContainer">
              <div className="pokeimg">
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <div claasName="pokeinfo">
                <h3>Type: {pokemon.type}</h3>
                <h4>
                  Weight: {pokemon.weight} | Height: {pokemon.height}
                </h4>
                <h4>
                  Hp: {pokemon.hp} | Speed: {pokemon.speed}
                </h4>
                <h4>
                  Attack: {pokemon.attack} | Defense: {pokemon.defense}
                </h4>
              </div>
            </div>
          </div>
        ) : (
          <h1>⦿ Please, choose a Pokémon ⦿</h1>
        )}
      </div>
    </div>
  );
};

export default App;
