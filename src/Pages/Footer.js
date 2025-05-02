import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <h2 className="footer-title">PokéSearch</h2>
      <p className="footer-description">
        Discover all Pokémon, explore their types, stats, and abilities with ease.
      </p>
      <div className="footer-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <span className="footer-link">GitHub</span>
        </a>
        <a href="https://www.pokemon.com/us/" target="_blank" rel="noopener noreferrer">
          <span className="footer-link">Official Pokémon</span>
        </a>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} PokéSearch. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
