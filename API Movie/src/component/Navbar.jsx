import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header className="bg-gray-800 shadow-lg p-4 sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between flex-wrap">
          {/* Logo/Nama Situs */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-teal-400 tracking-wider hover:text-teal-300 transition-colors duration-300"
          >
            LayarLebar
          </Link>

          {/* Navigasi Utama */}
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            {/* Tautan Home */}
            <Link
              to="/"
              className="text-lg font-medium text-gray-300 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
            {/* Tautan Favorites */}
            <Link
              to="/favorites"
              className="text-lg font-medium text-gray-300 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Favorites
            </Link>
            {/* Tautan About */}
            {/* Pastikan Anda memiliki file src/pages/About.jsx jika menggunakan ini */}
            <Link
              to="/about"
              className="text-lg font-medium text-gray-300 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              About
            </Link>
            {/* Tautan Contact */}
            {/* Pastikan Anda memiliki file src/pages/Contact.jsx jika menggunakan ini */}
            <Link
              to="/contact"
              className="text-lg font-medium text-gray-300 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Contact
            </Link>
            {/* Anda bisa menambahkan tautan lain di sini */}
          </div>
        </nav>
      </header>
  )
}
