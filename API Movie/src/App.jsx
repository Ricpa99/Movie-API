// App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'; // Perbaikan path
import MovieDetail from './pages/MovieDetail'; // Perbaikan path
import Favorites from './pages/Favorites'; // Perbaikan path
import { Navbar } from './component/Navbar';
// Import halaman Contact dan About jika sudah ada
// import Contact from './pages/Contact';
// import About from './pages/About';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar/>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Tambahkan rute untuk halaman baru */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </main>
    </div>
  );
}