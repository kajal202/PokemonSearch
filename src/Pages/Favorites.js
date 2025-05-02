import React, { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(PokemonContext);

  return (
    <div className="favorites-page">
      <h2>Your Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="pokemon-grid">
          {favorites.map(p => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
