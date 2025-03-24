import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavouritesProvider } from "./Pages/Favourites/FavouritesContext";
import Favourites from "./Pages/Favourites/Favourites";
import Compare from "./Pages/Compare/Compare";
import GameHL from "./Pages/Game/Game";
import { NavBar } from "./Components/NavBar";
import Pokemon from "./Pages/Pokedex/Pokemon";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Pokemon/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/compare" element={<Compare/>} />
          <Route path="/game" element={<GameHL/>} />
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
