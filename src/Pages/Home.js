import React, { useState, useMemo, useContext, useEffect } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import usePokemonFetcher from '../hooks/usePokemonFetcher';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import SortFilterBar from '../components/SortFilterBar';
import PaginatedList from '../components/PaginatedList';
import './Home.css';

const Home = () => {
  
  const [searchInput, setSearchInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [typeFilterMode, setTypeFilterMode] = useState('or'); // 'or' or 'and'
  const { favorites, toggleFavorite } = useContext(PokemonContext);

  const { pokemonList, types, loading, error } = usePokemonFetcher(150);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
      const pokemonTypeNames = pokemon.types.map(t => t.type.name);

      const matchesTypes =
        selectedTypes.length === 0 ||
        (typeFilterMode === 'and'
          ? selectedTypes.every(type => pokemonTypeNames.includes(type))
          : selectedTypes.some(type => pokemonTypeNames.includes(type)));

      return matchesSearch && matchesTypes;
    }).sort((a, b) => {
      if (selectedSort === "id") return a.id - b.id;
      if (selectedSort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [pokemonList, searchInput, selectedTypes, selectedSort, typeFilterMode]);


  return (
    <div className="home-page">
      <div className="controls">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={() => {}}
        />
         <div className="random-pokemon-button">
          <RandomPokemonButton />
        </div>
      </div>
   <br/>
     <div className= "sortFilter">
      <SortFilterBar
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        typeFilterMode={typeFilterMode}
        setTypeFilterMode={setTypeFilterMode}
        sortOptions={[
          { value: "id", label: "ID" },
          { value: "name", label: "Name" }
        ]}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      </div>

     <div>
     {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filteredPokemon.length === 0 && (
        <p>No Pokémon match your filters.</p>
      )}
     </div>

    
     
     {!loading && !error && (
        <PaginatedList items={filteredPokemon}>
          {(paginatedPokemon) => (
            <div className="pokemon-grid">
              {paginatedPokemon.map(p => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.some(f => f.id === p.id)}
                />
              ))}
            </div>
          )}
        </PaginatedList>
      )}
     </div>
 
    
  );
};

export default Home;
