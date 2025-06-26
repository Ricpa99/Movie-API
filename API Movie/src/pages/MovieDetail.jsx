//MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/Footer';

const API_KEY = 'eca1bce68ba0f79cb80110444cf6380e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

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

  // Effect untuk menyimpan favoriteMovies ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const displayNotification = (message, type) => {
    clearTimeout(window.notificationTimeout);
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    window.notificationTimeout = setTimeout(() => {
      setShowNotification(false);
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationType('');
      }, 500);
    }, 5000);
  };

  // Fetch movie details
  useEffect(() => {
    setMovie(null); 
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => setMovie(res.data))
      .catch(err => {
        console.error(err);
        displayNotification('Gagal mengambil detail film.', 'error');
      });
  }, [id]);

  // Fetch random movies (tetap sama logikanya)
  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const res1 = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const res2 = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`);
        const allPopularMovies = [...res1.data.results, ...res2.data.results];

        const availableMovies = allPopularMovies.filter(m => m.id !== parseInt(id));

        const shuffled = availableMovies.sort(() => 0.5 - Math.random());
        setRandomMovies(shuffled.slice(0, 10));
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };
    fetchRandomMovies();
  }, [id]);

  // Load comments from local storage (tetap sama)
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [id]);

  // Fungsi toggleFavorite yang dipanggil dari tombol (di Movie Detail Utama dan Rekomendasi)
  const toggleFavorite = (movieToToggle) => { // Menerima objek film yang akan di-toggle
    if (!movieToToggle || !movieToToggle.id) { // Pastikan objek film memiliki ID
      displayNotification('Film tidak dapat ditambahkan/dihapus dari favorit.', 'error');
      return;
    }

    const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movieToToggle.id);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteMovies.filter((favMovie) => favMovie.id !== movieToToggle.id);
      displayNotification('Dihapus dari favorit!', 'error');
    } else {
      updatedFavorites = [...favoriteMovies, { 
        id: movieToToggle.id,
        title: movieToToggle.title,
        poster_path: movieToToggle.poster_path,
        vote_average: movieToToggle.vote_average,
        // Sertakan properti lain yang mungkin penting untuk tampilan di Favorites.jsx
      }];
      displayNotification('Ditambahkan ke favorit!', 'success');
    }
    setFavoriteMovies(updatedFavorites); // Perbarui state lokal
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites)); // Perbarui localStorage
  };

  // Fungsi untuk memeriksa apakah film adalah favorit (dipanggil di JSX)
  const checkIfFavorite = (movieId) => {
    return favoriteMovies.some((favMovie) => favMovie.id === movieId);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      displayNotification('Komentar tidak boleh kosong.', 'error');
      return;
    }

    const commentToAdd = {
      text: newComment.trim(),
      timestamp: new Date().toLocaleString(),
      user: 'Anonim',
    };

    const updatedComments = [...comments, commentToAdd];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setNewComment('');
    displayNotification('Komentar berhasil ditambahkan!', 'success');
  };

  if (!movie) return <div className="text-center text-gray-400 mt-20">Memuat...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto p-4 flex-grow">
        {/* Movie Detail Section */}
        <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-lg shadow-lg p-6 mb-10 relative">
          {/* Tombol Love/Favorit di Movie Detail Utama */}
          {movie && (
            <button
              onClick={() => toggleFavorite(movie)} // Panggil toggleFavorite dengan objek movie saat ini
              className="absolute top-8 right-8 p-2 rounded-full bg-black bg-opacity-50 text-white focus:outline-none z-10"
              aria-label={checkIfFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className={`w-8 h-8 ${checkIfFavorite(movie.id) ? 'text-red-500' : 'text-gray-300'}`}
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
          )}
          
          <img
            src={`${IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover transform transition-transform duration-300 hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x750?text=No+Image"; }}
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">{movie.title}</h1>
            <p className="text-base text-gray-300 mb-2">
              Rating: <span className="font-semibold text-yellow-400">{movie.vote_average.toFixed(1)}</span> | Rilis: {movie.release_date}
            </p>
            <p className="text-gray-200 leading-relaxed mb-4 text-justify">{movie.overview}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map(genre => (
                <span key={genre.id} className="bg-teal-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Random Movies Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-2">Rekomendasi Film Lainnya</h2>
          {randomMovies.length === 0 ? (
            <p className="text-gray-400 text-center">Memuat rekomendasi...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {randomMovies.map((randomMovie) => (
                <div // Mengubah Link menjadi div agar tombol love tidak memicu navigasi
                  key={randomMovie.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group relative" // Tambahkan relative di sini
                >
                  {/* Tombol Love/Favorit untuk film rekomendasi */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Mencegah navigasi ke halaman detail film
                      toggleFavorite(randomMovie); // Panggil toggleFavorite dengan objek randomMovie
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-white focus:outline-none z-10"
                    aria-label={
                      checkIfFavorite(randomMovie.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <svg
                      className={`w-6 h-6 ${
                        checkIfFavorite(randomMovie.id)
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
                  <Link
                    to={`/movie/${randomMovie.id}`}
                    className="block" // Pastikan Link menutupi seluruh area yang bisa di-klik selain tombol
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img
                      src={`${IMG_BASE_URL}${randomMovie.poster_path}`}
                      alt={randomMovie.title}
                      className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x750?text=No+Image"; }}
                    />
                    <div className="p-3">
                      <h3 className="text-md font-semibold text-white truncate group-hover:text-teal-400">{randomMovie.title}</h3>
                      <p className="text-sm text-gray-400">Rating: {randomMovie.vote_average.toFixed(1)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section (tetap sama) */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-2">Komentar</h2>

          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-teal-500 focus:border-teal-500 mb-4 h-24 resize-y"
              placeholder="Tambahkan komentar Anda..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-md shadow-md transition-colors duration-300"
            >
              Kirim Komentar
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-gray-400 italic text-center">Belum ada komentar untuk film ini.</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow">
                  <p className="text-gray-300 text-sm mb-1">
                    <span className="font-semibold text-teal-300">{comment.user}</span> pada {comment.timestamp}
                  </p>
                  <p className="text-white text-base leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <FloatingNotification
        message={notificationMessage}
        type={notificationType}
        isVisible={showNotification}
      />
      <Footer />
    </div>
  );
}
console.log("hello");