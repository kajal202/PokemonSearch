import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PokemonProvider } from "./contexts/PokemonContext";
import Home from "./Pages/Home";
import PokemonDetail from "./Pages/PokemonDetail";
import Favorites from "./Pages/Favorites";
import "./App.css";
import Header from './Pages/Header';
import Footer from './Pages/Footer';

function App() {
  return (
    <Router>
      <PokemonProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </PokemonProvider>
    </Router>
  );
}

export default App;
