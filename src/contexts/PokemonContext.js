import React, { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (pokemon) => {
    const updatedFavorites = favorites.some(fav => fav.id === pokemon.id)
      ? favorites.filter(fav => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <PokemonContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};
