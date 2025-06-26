//favorite.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer'; 

// Import komponen FloatingNotification yang sudah ada
const FloatingNotification = ({ message, type, isVisible }) => {
  if (!isVisible && message === '') return null;

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const translateY = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0';

  return (
    <div
      className={`fixed bottom-48 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white z-50
                  transform transition-all duration-500 ease-out ${bgColor} ${translateY}`}
      style={{ minWidth: '250px', maxWidth: '90%', textAlign: 'center' }}
    >
      {message}
    </div>
  );
};


export default function Favorites() {
  
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteMovies');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error parsing favorite movies from localStorage:", error);
      return [];
    }
  });

  // State untuk notifikasi
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Fungsi untuk menampilkan notifikasi
  const displayNotification = (message, type) => {
    // Bersihkan timeout yang ada untuk mencegah notifikasi tumpang tindih
    clearTimeout(window.notificationTimeout); 

    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Atur timeout untuk menyembunyikan notifikasi
    window.notificationTimeout = setTimeout(() => {
      setShowNotification(false);
      // Tunggu hingga animasi selesai sebelum mengosongkan pesan
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationType('');
      }, 500); // Durasi transisi notifikasi adalah 500ms
    }, 3000); // Notifikasi terlihat selama 3 detik
  };


  // Effect untuk me-reload favoriteMovies saat komponen fokus atau storage berubah
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const updatedFavorites = localStorage.getItem("favoriteMovies");
        setFavoriteMovies(updatedFavorites ? JSON.parse(updatedFavorites) : []);
      } catch (error) {
        console.error("Error parsing favorites on storage event:", error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const handleFocus = () => {
      handleStorageChange();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Fungsi untuk menghapus film dari favorit
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites)); // Simpan perubahan ke localStorage

    // Tampilkan notifikasi menggunakan FloatingNotification
    displayNotification('Film berhasil dihapus dari favorit!', 'error'); // Menggunakan 'error' untuk warna merah pada notifikasi hapus
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Your Favorite Movies</h1>

        {favoriteMovies.length === 0 ? (
          <p className="text-gray-400 text-lg font-medium text-center mt-20">
            You haven't added any movies to your favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favoriteMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transition relative"
              >
                {/* Tombol Hapus Favorit */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromFavorites(movie.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-red-500 focus:outline-none"
                  aria-label="Remove from favorites"
                >
                  <svg
                    className="w-6 h-6"
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
                    src={`${IMG_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x750?text=No+Image"; }}
                  />
                  <div className="p-2">
                    <h2 className="text-lg font-bold truncate">{movie.title}</h2>
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
      {/* Panggil komponen notifikasi di sini */}
      <FloatingNotification
        message={notificationMessage}
        type={notificationType}
        isVisible={showNotification}
      />
      <Footer />
    </div>
  );
}