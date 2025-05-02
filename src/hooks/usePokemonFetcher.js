import { useState, useEffect } from 'react';

const usePokemonFetcher = (limit = 50, offset = 0) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const detailedData = await Promise.all(
          data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
          )
        );
        setPokemonList(detailedData);
        const allTypes = new Set(detailedData.flatMap(p => p.types.map(t => t.type.name)));
        setTypes([...allTypes].sort());
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { pokemonList, types, loading, error };
};

export default usePokemonFetcher;
