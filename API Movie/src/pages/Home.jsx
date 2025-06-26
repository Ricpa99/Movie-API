// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";

const API_KEY = "eca1bce68ba0f79cb80110444cf6380e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]); // State untuk menyimpan daftar genre
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteMovies");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // NEW: Effect untuk me-reload favoriteMovies saat komponen fokus
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const updatedFavorites = localStorage.getItem("favoriteMovies");
        setFavoriteMovies(updatedFavorites ? JSON.parse(updatedFavorites) : []);
      } catch (error) {
        console.error("Error parsing favorites on storage event:", error);
      }
    };

    // Event listener untuk 'storage' event (jika ada perubahan dari tab lain)
    window.addEventListener('storage', handleStorageChange);

    // Untuk memastikan update saat kembali dari halaman lain (di tab yang sama)
    const handleFocus = () => {
      handleStorageChange(); // Panggil fungsi yang sama saat tab/window fokus
    };
    window.addEventListener('focus', handleFocus);
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []); // Run only once on mount

  // NEW: Effect untuk mengambil daftar genre saat komponen di-mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        const res = await axios.get(url);
        setGenres(res.data.genres); // Set state genres dengan data yang diambil
        console.log("Fetched genres:", res.data.genres); // Untuk debugging
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali saat komponen di-mount

  // Fungsi untuk mengambil data film (populer atau hasil pencarian)
  const fetchMoviesData = async () => {
    try {
      setLoading(true);
      let url = "";
      if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=${currentPage}`;
      } else {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      }

      const res = await axios.get(url);
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Effect utama untuk mengambil film setiap kali currentPage atau query berubah
  useEffect(() => {
    fetchMoviesData();
  }, [currentPage, query]);

  // Effect untuk menyimpan favoriteMovies ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  // Filter film berdasarkan genre yang dipilih (dilakukan secara lokal)
  const moviesToDisplay = movies.filter((movie) => {
    // Pastikan movie.genre_ids ada sebelum menggunakan .includes()
    return (
      selectedGenre === "" || 
      (movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre)))
    );
  });

  // Fungsi untuk mengubah halaman
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0); // Gulir ke atas halaman saat pindah halaman
    }
  };

  // Fungsi untuk menambahkan/menghapus film dari favorit
  const toggleFavorite = (movieToToggle) => {
    const isFavorite = favoriteMovies.some(
      (favMovie) => favMovie.id === movieToToggle.id
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteMovies.filter((favMovie) => favMovie.id !== movieToToggle.id);
    } else {
      updatedFavorites = [...favoriteMovies, { ...movieToToggle }];
    }
    setFavoriteMovies(updatedFavorites);
    // Secara eksplisit menyimpan ke localStorage di sini juga
    // Note: useEffect yang memantau favoriteMovies sudah menangani ini,
    // tapi menyimpan secara eksplisit di sini juga tidak masalah.
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  // Fungsi untuk memeriksa apakah film adalah favorit
  const checkIfFavorite = (movieId) => {
    return favoriteMovies.some((favMovie) => favMovie.id === movieId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
              setSelectedGenre(""); // Clear selected genre on search
            }}
            className="p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
          />
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
              setQuery(""); // Clear search query on genre select
            }}
            className="p-2 rounded bg-gray-800 text-white w-full md:w-1/2"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : moviesToDisplay.length === 0 ? (
          <p className="text-red-400 text-lg font-medium text-center mt-20">
            {query
              ? "Judul film tidak ditemukan."
              : "Tidak ada film ditemukan dengan kriteria ini."}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {moviesToDisplay.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transition relative"
              >
                {/* Tombol Love/Favorit */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(movie);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-white focus:outline-none"
                  aria-label={
                    checkIfFavorite(movie.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className={`w-6 h-6 ${
                      checkIfFavorite(movie.id)
                        ? "text-red-500"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {/* Link ke halaman detail film */}
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "https://placehold.co/500x750/333333/FFFFFF?text=No+Poster"}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-2">
                    <h2 className="text-lg font-bold truncate">
                      {movie.title}
                    </h2>
                    <p className="text-sm font-bold text-gray-400">
                      Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8 mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 || loading
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            }`}
          >
            Previous
          </button>
          <span className="text-white text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages || loading
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            }`}
          >
            Next
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
