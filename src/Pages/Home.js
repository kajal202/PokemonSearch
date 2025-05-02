// import React, { useState,  useMemo, useContext } from 'react';
// import { PokemonContext } from '../contexts/PokemonContext';
// import usePokemonFetcher from '../hooks/usePokemonFetcher';
// import PokemonCard from '../components/PokemonCard';
// import SearchBar from '../components/SearchBar';
// import SortFilterBar from '../components/SortFilterBar';
// import Pagination from '../components/Pagination';
// import "./Home.css"
// import { useEffect } from 'react';


// const Home = () => {
//   const [searchInput, setSearchInput] = useState('');
//   // const [selectedType, setSelectedType] = useState('');
//   const [selectedTypes, setSelectedTypes] = useState([]);

//   const [selectedSort, setSelectedSort] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(14); // 🔄 Added
//   const { favorites, toggleFavorite } = useContext(PokemonContext);

//   const { pokemonList, types, loading, error } = usePokemonFetcher(150);

//   // const filteredPokemon = useMemo(() => {
//   //   return pokemonList.filter(pokemon => {
//   //     const matchesSearch = pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
      
//   //     const matchesTypes = selectedTypes.length === 0 || 
//   //       selectedTypes.every(selected =>
//   //         pokemon.types.some(t => t.type.name === selected)
//   //       );
        
//   //     return matchesSearch && matchesTypes;
//   //   }).sort((a, b) => {
//   //     if (selectedSort === "id") return a.id - b.id;
//   //     if (selectedSort === "name") return a.name.localeCompare(b.name);
//   //     return 0;
//   //   });
//   // }, [pokemonList, searchInput, selectedTypes, selectedSort]);
//   const filteredPokemon = useMemo(() => {
//     return pokemonList.filter(pokemon => {
//       const matchesSearch = pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
  
//       const pokemonTypeNames = pokemon.types.map(t => t.type.name);
  
//       // All selected types must be included in the Pokémon's types
//       // const matchesTypes = selectedTypes.length === 0 ||
//       //   selectedTypes.every(type => pokemonTypeNames.includes(type));
//   const matchesTypes =
//   selectedTypes.length === 0 ||
//   selectedTypes.some(type => pokemonTypeNames.includes(type));

//       return matchesSearch && matchesTypes;
//     }).sort((a, b) => {
//       if (selectedSort === "id") return a.id - b.id;
//       if (selectedSort === "name") return a.name.localeCompare(b.name);
//       return 0;
//     });
//   }, [pokemonList, searchInput, selectedTypes, selectedSort]);
  
//   const totalPages = useMemo(() =>
//     Math.ceil(filteredPokemon.length / itemsPerPage), [filteredPokemon, itemsPerPage]);

//   const paginatedPokemon = useMemo(() =>
//     filteredPokemon.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     ), [filteredPokemon, currentPage, itemsPerPage]);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset page on change
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchInput, selectedTypes, selectedSort]);

  

//   return (
//     <div className="home-page">
//       <div className="controls">
//         <SearchBar
//           searchInput={searchInput}
//           setSearchInput={setSearchInput}
//           onSearch={() => setCurrentPage(1)}
//         />

//       </div>

//       <div className="itemsperpage">
//         {/* <SortFilterBar
//           types={types}
//           selectedType={selectedType}
//           setSelectedType={setSelectedType}
//           sortOptions={[
//             { value: "id", label: "ID" },
//             { value: "name", label: "Name" }
//           ]}
//           selectedSort={selectedSort}
//           setSelectedSort={setSelectedSort}
//         /> */}
//         <SortFilterBar
//   types={types}
//   selectedTypes={selectedTypes}
//   setSelectedTypes={setSelectedTypes}
//   sortOptions={[
//     { value: "id", label: "ID" },
//     { value: "name", label: "Name" }
//   ]}
//   selectedSort={selectedSort}
//   setSelectedSort={setSelectedSort}
// />
// {!loading && !error && paginatedPokemon.length === 0 && (
//   <p>No Pokémon match your filters.</p>
// )}

//         <div>
//           <label htmlFor="items-per-page">Items per page: </label>
//           <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>


//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <div className="pokemon-grid">
//         {paginatedPokemon.map(p => (
//           <PokemonCard
//             key={p.id}
//             pokemon={p}
//             onToggleFavorite={toggleFavorite}
//             isFavorite={favorites.some(f => f.id === p.id)}
//           />
//         ))}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default Home;


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

  useEffect(() => {
    window.scrollTo(0, 0); // Optional: Scroll to top on filter change
  }, [searchInput, selectedTypes, selectedSort, typeFilterMode]);


  return (
    <div className="home-page">
      <div className="controls">
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={() => {}}
        />
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
