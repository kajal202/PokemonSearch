import React from "react";
import "./Header.css"; // Make sure to create this CSS file

const Header = () => (
    
  <header className="header">
    <div className="header-content">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Pokéball"
        className="logo"
      />
      <h1 className="title">PokéSearch</h1>
    </div>
  </header>
);

export default Header;
