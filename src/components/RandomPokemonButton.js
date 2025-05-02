import { useNavigate } from "react-router-dom";

const RandomPokemonButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    navigate(`/pokemon/${randomId}`);
  };

  return <button onClick={handleClick}>🎲 Random Pokémon</button>;
};

export default RandomPokemonButton;

