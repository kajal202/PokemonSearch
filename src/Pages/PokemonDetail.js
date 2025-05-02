import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PokemonContext } from "../contexts/PokemonContext";
import "./PokemonDetail.css"

const PokemonDetail = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const species = await speciesRes.json();
        const evoRes = await fetch(species.evolution_chain.url);
        const evoChain = await evoRes.json();

        let evoData = [];
        let evo = evoChain.chain;

        do {
          evoData.push(evo.species.name);
          evo = evo.evolves_to[0];
        } while (evo && evo.evolves_to);

        setEvolution(evoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading || !pokemon) return <p>Loading...</p>;

  const isFavorite = favorites.some(f => f.id === pokemon.id);

  return (
    
    <div className="pokemon-detail">
      <h1>{pokemon.name} (#{pokemon.id})</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <button onClick={() => toggleFavorite(pokemon)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map(a => <li key={a.ability.name}>{a.ability.name}</li>)}
      </ul>

      <h2>Moves</h2>
      <ul>
        {pokemon.moves.slice(0, 10).map(m => <li key={m.move.name}>{m.move.name}</li>)}
      </ul>

      <h2>Evolution Chain</h2>
      <ul>
        {evolution.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;
