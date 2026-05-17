import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Layout/Header';
import Footer from './Layout/Footer';

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Orders from "./pages/Orders";
import TrophyAwards from "./pages/TrophyAwards";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/trophies" element={<TrophyAwards />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;